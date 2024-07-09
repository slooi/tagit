import { defineConfig } from 'vite'
import { fileURLToPath } from 'url';
import path from 'path'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        background: path.resolve(__dirname, "src", "background", 'background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        dir: 'dist',
      }
    }
  }
})
