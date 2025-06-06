import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "TranslationWidget",
      fileName: "translation-widget",
    },
    minify: "terser",
    sourcemap: true,
    rollupOptions: {
      output: [{
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name][extname]",
      },
      {
        format: "umd",
        name: "TranslationWidget",
        entryFileNames: "[name].min.js",
        chunkFileNames: "[name]-[hash].min.js",
        assetFileNames: "[name][extname]",
      },]
    },
    // Ensure CSS is injected into the JavaScript bundle
    cssCodeSplit: false,
    // Ensure CSS is inlined in the JavaScript bundle
    cssMinify: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src"],
    }),
  ],
});
