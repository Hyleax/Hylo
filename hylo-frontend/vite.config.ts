import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 3002,
    proxy: {
      "/hylo": {
        target: "http://localhost:5000/",
        changeOrigin: true
      }
    },
  },
  plugins: [react()],
})
