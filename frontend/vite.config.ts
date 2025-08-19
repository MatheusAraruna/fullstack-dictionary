import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode}) => {
  // load enviroment variables
  const env = loadEnv(mode, process.cwd(), '')

  return {
  base: './',
  plugins: [
    react(), 
    tailwindcss(), 
    VitePWA({ 
      registerType: 'autoUpdate'
    }),
    viteTsconfigPaths()
  ],
  server:{
    port: Number(env.VITE_PORT) || 3000,
  },
  preview: {
    port: Number(env.VITE_PORT) || 3000
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
          zod: ['zod'],
        },
      },
    },
  }
}
})
