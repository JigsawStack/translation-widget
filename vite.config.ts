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
                format: 'umd',
                entryFileNames: '[name].min.js',
            },
        },
        cssCodeSplit: false,
        cssMinify: true,
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['src'],
        }),
    ]
})
