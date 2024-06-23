1. Make sure that you name 
2. npm i -D @types/firefox-webext-browser
3. Make sure to enable "logs" or "enable always on top"
4. 

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
        main: path.resolve(__dirname,'index.html'),
        background: path.resolve(__dirname,"src","background" ,'background.ts'),
        content_script: path.resolve(__dirname,"src","content_scripts" ,"content_script.ts")
      },
      output: {
        entryFileNames: '[name].js',
        dir: 'dist',
      }
    }
  }
})