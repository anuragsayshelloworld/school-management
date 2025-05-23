// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/school-management/', // <-- your repo name here
  plugins: [react()],
});
