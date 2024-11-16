import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import json from "@rollup/plugin-json";

export default defineConfig({
  plugins: [react(), json()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.json"],
});
