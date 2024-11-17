import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  // @ts-expect-error Vitest types are not included in the types field
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, "src/package/v2/index.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "react",
        "react-dom",
        "lodash",
        "lodash-es",
        "tailwindcss-animate",
        "@radix-ui/react-icons",
        "tailwind-merge",
        "clsx",
      ],
      treeshake: false,
    },
  },
});
