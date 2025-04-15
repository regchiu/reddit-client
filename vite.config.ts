import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "${fileURLToPath(new URL('./src/styles/_variables.scss', import.meta.url))}" as *;
        @import 'normalize.css/normalize.css';
      `,
      },
    },
  },
})
