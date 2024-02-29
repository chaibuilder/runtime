import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import {resolve} from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, "src/package/runtime/index.tsx"),
        controls: resolve(__dirname, "src/package/controls/index.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "lodash", "tailwindcss-animate", "@radix-ui/react-icons", "tailwind-merge", "clsx"],
      treeshake: false
    },
  },
});
