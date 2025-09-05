import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    proxy: {
      "/api-football": {
        target: "https://api.football-data.org",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api-football/, ""),
      },
    },
  },
});
