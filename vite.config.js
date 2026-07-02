import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/auth': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/contact': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/messages': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/projects': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/team': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/visits': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/stats': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/shorts': { target: 'http://localhost:3001', changeOrigin: true },
      '/api/health': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: false,
      visualEditAgent: true
    }),
    react(),
  ]
});