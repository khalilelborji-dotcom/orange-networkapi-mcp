
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'node24',
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/cloud-run.ts'),
      formats: ['es'],
      fileName: () => 'cloud-run.js',
    },
    rollupOptions: {
      external: [
        /^node:/,
        /^[^./]/,
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
