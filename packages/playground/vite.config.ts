import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'ct-dart3': resolve(__dirname, '../dart3/packages/index.ts')
    }
  },
  server: {
    port: 5173,
    open: true
  }
})