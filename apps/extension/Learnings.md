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

5. XOR in typescript
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


6.
If you only have `tags` instead of `tags[]`, `req.body.tags` will only be `string` until you have two or more appends then it'll be `string[]`. If you have the `tags[]`, `req.body.tags` will be `stringp[]`
```js
formData.append("tags", tag)
```
```js
formData.append("tags[]", tag)	
``` 
		

# ISSUES
1. Because `import` keywords aren't allowed in the javascript content_script, I have to bundle `content_script.tsx` with the imported react code. Make two `vite.config.___.ts` files and make the `content_script.tsx` vite file have `inlineDynamicImports: true`
2. Styles does not work for `content_scripts`. Importing styles does not make them appear in the transpiled js files for some reason