import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { css } from './config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  server: {
    port: 3000
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      components: '/src/components',
      actions: '/src/actions',
      images: '/src/assets/images',
      utils: '/src/utils',
      helpers: '/src/helpers',
      views: '/src/views',
      'fonts/*': '/src/public/fonts'
    },
    transform: (code, id) => {
      if (id.endsWith('.css')) {
        // Replace the font URL with the correct public path
        return code.replace(/url\('\.\.\/fonts\//g, "url('/fonts/");
      }
      return code;
    }
  }
});
