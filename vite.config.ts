import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Logicards/",
  build: {
    assetsInlineLimit: Infinity, // inline ALL assets, no matter size
  },
});
