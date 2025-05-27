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
                // Include CSS in the output
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'style.css'
                    if (assetInfo.name === 'translation-widget.css') return 'style.css'
                    return '[name]-[hash][extname]'
                },
            },
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['src'],
        }),
    ]
})
