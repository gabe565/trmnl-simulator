import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss(), Icons({ compiler: 'vue3' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
