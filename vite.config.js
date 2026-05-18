import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@stores': resolve(__dirname, 'src/stores'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@services': resolve(__dirname, 'src/services'),
    },
  },
  server: {
    port: 5173,
    host: true,
    // Туннели (ngrok / cloudflared / localtunnel) шлют Host с чужого домена — иначе Vite блокирует.
    allowedHosts: [
      '.ngrok-free.dev',
      '.ngrok-free.app',
      '.ngrok.io',
      '.trycloudflare.com',
      '.loca.lt',
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        /** Чтобы бэкенд выставил cookie Secure + SameSite=None под HTTPS (ngrok). */
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            const raw = (req.headers['x-forwarded-proto'] || '').toString().split(',')[0].trim().toLowerCase();
            if (raw === 'https') {
              proxyReq.setHeader('X-Forwarded-Proto', 'https');
            }
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          motion: ['framer-motion'],
          ui: ['lucide-react', 'clsx'],
          stores: ['zustand'],
        },
      },
    },
  },
})
