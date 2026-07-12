import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths so the bundle works at any deploy root or subdir.
  // Combined with HashRouter (in main.jsx), routes survive a hard refresh
  // on any static host without server-side fallbacks.
  base: './',
  plugins: [react()],
  server: { port: 5173, open: true },
});
