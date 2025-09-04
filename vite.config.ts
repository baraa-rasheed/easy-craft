import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/easy-craft",
  plugins: [react(), tailwindcss()],
  server: { open: true, port: 3000 },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
