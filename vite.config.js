import base44 from '@base44/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function apiProxy() {
  return {
    target: 'http://localhost:3001',
    changeOrigin: true,
    configure(proxy) {
      proxy.on('proxyReq', (proxyReq, req) => {
        const clientIp = req.socket?.remoteAddress;
        if (clientIp) {
          proxyReq.setHeader('X-Forwarded-For', clientIp);
        }
      });
    },
  };
}

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
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['framer-motion'],
            'vendor-query': ['@tanstack/react-query'],
            'vendor-charts': ['recharts'],
          },
        },
      },
    },
    server: {
      proxy: {
        '/api/auth': apiProxy(),
        '/api/contact': apiProxy(),
        '/api/messages': apiProxy(),
        '/api/projects': apiProxy(),
        '/api/team': apiProxy(),
        '/api/visits': apiProxy(),
        '/api/stats': apiProxy(),
        '/api/shorts': apiProxy(),
        '/api/partners': apiProxy(),
        '/api/health': apiProxy(),
      },
    },
    plugins,
  };
});
