import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    allowedHosts: ["lesson-planner-p2te.onrender.com"],
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
})
