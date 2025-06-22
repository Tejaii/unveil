import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// RSS proxy setup for CORS-safe fetching
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/rss-proxy": {
        target: "", // will be dynamically replaced in rewrite
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            const targetUrl = new URLSearchParams(req.url.split("?")[1]).get("url");
            if (targetUrl) {
              proxyReq.path = targetUrl;
            }
          });
        },
        rewrite: path => path.replace(/^\/api\/rss-proxy\?url=/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
