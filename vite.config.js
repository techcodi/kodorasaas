import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "./", // <-- This fixes blank screen on deployment
  plugins: [react()],
});
