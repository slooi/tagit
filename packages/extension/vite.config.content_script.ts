import { defineConfig } from 'vite'
import { fileURLToPath } from 'url';
import path from 'path'
import react from '@vitejs/plugin-react'
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import inject from './vite-plugin-inject-css'; // Adjust path as necessary

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(), inject(),  // Add the custom plugin here
  ],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content_script: path.resolve(__dirname, 'src', 'content_scripts', 'content_script.tsx'),
      },
      output: {
        entryFileNames: '[name].js',
        dir: 'dist',
        inlineDynamicImports: true,
      },
    },
  },
});