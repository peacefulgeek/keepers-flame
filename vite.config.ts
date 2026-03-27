import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: isSsrBuild
    ? {
        ssr: true,
        outDir: 'dist/server',
        rollupOptions: {
          input: 'src/entry-server.tsx',
        },
      }
    : {
        outDir: 'dist/client',
        rollupOptions: {
          input: 'index.html',
        },
      },
  ssr: {
    noExternal: ['react-router-dom'],
  },
}));
