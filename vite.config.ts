import { defineConfig } from 'vite'
import alias from '@rollup/plugin-alias'
import reactRefresh from '@vitejs/plugin-react-refresh'
import windicss from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias({
      entries: [{ find: '~', replacement: '/src' }]
    }),
    reactRefresh(),
    windicss()
  ],
  server: {
    fs: {
      allow: ['..'],
      strict: false
    }
  }
})
