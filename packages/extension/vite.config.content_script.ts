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
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content_script: path.resolve(__dirname, "src", "content_scripts", "content_script.tsx")
      },
      output: {
        entryFileNames: '[name].js',
        dir: 'dist',
        inlineDynamicImports: true,
      }
    }
  }
})
