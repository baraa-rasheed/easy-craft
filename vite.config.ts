import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; 
export default defineConfig({
  base: "/",
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react", 
    }), 
  ], 
  server: { open: true, port: 3000 }, 
});
