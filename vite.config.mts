import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config
export default defineConfig({
  base: '/cv-maker/',
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    VitePWA({
      filename: 'sw.ts',
      injectManifest: {
        globPatterns: ['**/*.{html,css,js,png,webp,woff2,webmanifest}'],
      },
      injectRegister: null,
      manifest: false,
      registerType: 'autoUpdate',
      srcDir: 'src',
      strategies: 'injectManifest',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '#': '/src/config',
      '%': '/src/models',
      '$': '/src/slices',
    }
  },
});
