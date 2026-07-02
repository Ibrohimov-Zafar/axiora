import base44 from '@base44/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];

  // Base44 faqat dev rejimda — productionda /api/apps/null/analytics xatolari bo'lmasin
  if (mode === 'development') {
    plugins.unshift(
      base44({
        legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
        hmrNotifier: true,
        navigationNotifier: true,
        analyticsTracker: false,
        visualEditAgent: true,
      }),
    );
  }

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
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
    plugins,
  };
});
