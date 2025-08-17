import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(), 
    tailwindcss(), 
    VitePWA({ 
      registerType: 'autoUpdate'
    })
  ],
  server:{
    port: 3000,
  },
  preview: {
    port: 3000
  },

  optimizeDeps: { exclude: ['fsevents'] },
  build: {
    rollupOptions: {
      external: ['fs/promises'],
      output: {
        experimentalMinChunkSize: 5000,
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-router-dom': ['react-router-dom'],
          // 'react-query': ['@tanstack/react-query'],
          // zod: ['zod'],
        },
      },
    },
  }
})
