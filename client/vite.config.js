import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows Phone and other devices on the network to access the server
    port: 5173      // Optional: specify the port, or you can leave it to let Vite choose
  }
})