import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

const basePath = process.env.SITE_BASE_PATH ?? '';

export default defineConfig({
  root: 'github',
  base: `${basePath}/`,
  publicDir: '../public',
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  define: {
    'process.env.NEXT_PUBLIC_BASE_PATH': JSON.stringify(basePath),
  },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  build: {
    outDir: '../dist/github',
    emptyOutDir: true,
  },
});

