import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/dadata-clean': {
        target: 'https://cleaner.dadata.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dadata-clean/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
