import { defineConfig } from 'vite'
import alias from '@rollup/plugin-alias'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    alias({
      entries: [{ find: '~', replacement: '/src' }]
    }),
    reactRefresh()
  ],
  server: {
    fs: {
      allow: ['..'],
      strict: false
    }
  }
})
