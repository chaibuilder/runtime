#!/usr/bin/env node

import { execSync } from "child_process";
import { readFileSync } from "fs";
import process from "process";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to validate version number
function validateVersion(version) {
  const regex = /^[0-9]+\.[0-9]+\.[0-9]+(-beta\.[0-9]+)?$/;
  if (!regex.test(version)) {
    throw new Error("Invalid version format. Please use format: x.x.x or x.x.x-beta.x");
  }
  return version;
}

// Function to execute shell commands
function execCommand(command) {
  try {
    return execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
}

// Function to get current branch name
function getCurrentBranch() {
  return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
}

// Function to safely push to a branch
function safePushToBranch(branch, targetBranch = "main") {
  try {
    // First try to push with upstream tracking
    execCommand(`git push -u origin "${branch}:${targetBranch}"`);
  } catch (error) {
    console.error(
      "Failed to push to remote. Please ensure you have the right permissions and the branch name is valid.",
    );
    throw error;
  }
}

async function main() {
  try {
    // Read current version from package.json
    const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));
    const currentVersion = packageJson.version;
    console.log(`Current version: ${currentVersion}`);

    // Ask for new version
    const newVersion = await new Promise((resolve) => {
      rl.question("Enter new version number: ", resolve);
    });

    // Validate new version
    validateVersion(newVersion);

    // Get current branch name
    const currentBranch = getCurrentBranch();

    // Update version in package.json (without git tag)
    execCommand(`pnpm version ${newVersion} --no-git-tag-version`);

    // Git operations
    execCommand("git add package.json");
    execCommand(`git commit -m "chore: bump version to ${newVersion}"`);

    // Build the project
    execCommand("pnpm run build");

    // Create tag
    execCommand(`git tag -a v${newVersion} -m "Release version ${newVersion}"`);

    // First push the tag - this will trigger the release action
    execCommand(`git push origin v${newVersion}`);

    console.log("⏳ Waiting 5 seconds for the release action to start...");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Then push to main - this won't trigger the action again since the tag is already there
    safePushToBranch(currentBranch, "main");

    console.log(`✅ Version bumped to ${newVersion} and tag created successfully!`);
    console.log(`🔄 Created and pushed tag v${newVersion}`);
    console.log(`📦 Release action has been triggered`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    // Revert package.json changes
    execCommand("git checkout package.json");
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
