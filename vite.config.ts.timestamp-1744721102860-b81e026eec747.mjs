// vite.config.ts
import { defineConfig } from "file:///Users/suraj/_chai/chaibuilder-runtime/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.16/node_modules/vite/dist/node/index.js";
import react from "file:///Users/suraj/_chai/chaibuilder-runtime/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_vite@5.4.14_@types+node@20.17.16_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
import dts from "file:///Users/suraj/_chai/chaibuilder-runtime/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.16_rollup@4.32.1_typescript@5.7.3_vite@5.4.14_@types+node@20.17.16_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/suraj/_chai/chaibuilder-runtime";
var vite_config_default = defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  // @ts-expect-error Vitest types are not included in the types field
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__vite_injected_original_dirname, "src/package/v2/index.ts")
      },
      formats: ["es", "cjs"]
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
        "clsx"
      ],
      treeshake: false
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3VyYWovX2NoYWkvY2hhaWJ1aWxkZXItcnVudGltZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3N1cmFqL19jaGFpL2NoYWlidWlsZGVyLXJ1bnRpbWUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3N1cmFqL19jaGFpL2NoYWlidWlsZGVyLXJ1bnRpbWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgZHRzKHsgcm9sbHVwVHlwZXM6IHRydWUgfSldLFxuICAvLyBAdHMtZXhwZWN0LWVycm9yIFZpdGVzdCB0eXBlcyBhcmUgbm90IGluY2x1ZGVkIGluIHRoZSB0eXBlcyBmaWVsZFxuICB0ZXN0OiB7XG4gICAgaW5jbHVkZTogW1wic3JjLyoqLyoudGVzdC57dHMsdHN4fVwiXSxcbiAgICBnbG9iYWxzOiB0cnVlLFxuICB9LFxuICBidWlsZDoge1xuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHtcbiAgICAgICAgaW5kZXg6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9wYWNrYWdlL3YyL2luZGV4LnRzXCIpLFxuICAgICAgfSxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCJdLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuICAgICAgLy8gaW50byB5b3VyIGxpYnJhcnlcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgIFwicmVhY3RcIixcbiAgICAgICAgXCJyZWFjdC1kb21cIixcbiAgICAgICAgXCJsb2Rhc2hcIixcbiAgICAgICAgXCJsb2Rhc2gtZXNcIixcbiAgICAgICAgXCJ0YWlsd2luZGNzcy1hbmltYXRlXCIsXG4gICAgICAgIFwiQHJhZGl4LXVpL3JlYWN0LWljb25zXCIsXG4gICAgICAgIFwidGFpbHdpbmQtbWVyZ2VcIixcbiAgICAgICAgXCJjbHN4XCIsXG4gICAgICBdLFxuICAgICAgdHJlZXNoYWtlOiBmYWxzZSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9TLFNBQVMsb0JBQW9CO0FBQ2pVLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBSGhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLGFBQWEsS0FBSyxDQUFDLENBQUM7QUFBQTtBQUFBLEVBRTdDLE1BQU07QUFBQSxJQUNKLFNBQVMsQ0FBQyx3QkFBd0I7QUFBQSxJQUNsQyxTQUFTO0FBQUEsRUFDWDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsYUFBYTtBQUFBLElBQ2IsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLHlCQUF5QjtBQUFBLE1BQ3JEO0FBQUEsTUFDQSxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsSUFDdkI7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBO0FBQUEsTUFHYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
