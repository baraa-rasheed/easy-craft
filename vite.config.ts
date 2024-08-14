import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { comlink } from "vite-plugin-comlink";

import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  base: "/",
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    comlink(),
  ],
  build: { outDir: "build" },
  server: { open: true, port: 3000 },
  define: { "process.env": process.env },
  worker: { plugins: () => [comlink()] },
});
