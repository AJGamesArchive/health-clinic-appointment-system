import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load ENVS
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  define: {
    "import.meta.env.API_URL": JSON.stringify(process.env.API_URL),
  },
});
