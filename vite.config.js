import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react(), tailwindcss(), svgr()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api/dadata/find-party': {
          target: 'https://suggestions.dadata.ru',
          changeOrigin: true,
          rewrite: () => '/suggestions/api/4_1/rs/findById/party',
          headers: {
            Authorization: `Token ${env.DADATA_API_KEY}`,
          },
        },
        '/api/dadata/clean-address': {
          target: 'https://cleaner.dadata.ru',
          changeOrigin: true,
          rewrite: () => '/api/v1/clean/address',
          headers: {
            Authorization: `Token ${env.DADATA_API_KEY}`,
            'X-Secret': env.DADATA_SECRET_KEY,
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
