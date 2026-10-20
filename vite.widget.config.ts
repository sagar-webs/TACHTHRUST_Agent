import { defineConfig } from "vite";
import path from "node:path";

// Builds the Shopify storefront widget as a single self-contained script: public/shopify-agent.js
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  define: { "process.env.NODE_ENV": '"production"' },
  build: {
    lib: { entry: "src/shopify-widget/index.ts", formats: ["iife"], name: "TechThrustShopAgent", fileName: () => "shopify-agent.js" },
    outDir: "public",
    emptyOutDir: false, // public/ may hold other static files
    target: "es2020",
    minify: true,
  },
});
