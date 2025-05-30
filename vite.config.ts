import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'TranslationWidget',
            fileName: 'translation-widget',
            formats: ['es', 'umd'],
        },
        minify: 'terser',
        sourcemap: true,
        rollupOptions: {
            output: {
                // Ensure the UMD build is minified
                format: 'umd',
                entryFileNames: '[name].min.js',
                // Clean up the output directory on each build
                chunkFileNames: '[name]-[hash].js',
                // Ensure CSS is bundled with the JavaScript
                assetFileNames: '[name][extname]',
            },
        },
        // Ensure CSS is injected into the JavaScript bundle
        cssCodeSplit: false,
        // Ensure CSS is inlined in the JavaScript bundle
        cssMinify: true,
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['src'],
        }),
    ]
})
