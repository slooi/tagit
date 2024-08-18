import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

export default function vitePluginInjectCss(): Plugin {
	return {
		name: 'vite-plugin-inject-css',
		enforce: 'post',
		async transform(code, id) {
			if (id.endsWith('.tsx')) {
				const dir = path.dirname(id);
				const regex = /import\s+['"](.+\.css)['"]/g;
				let match;
				let cssContent = '';

				while ((match = regex.exec(code)) !== null) {
					const cssPath = path.resolve(dir, match[1]);
					if (fs.existsSync(cssPath)) {
						const cssFileContent = await fs.promises.readFile(cssPath, 'utf-8');
						cssContent += cssFileContent;
					}
				}

				if (cssContent) {
					const styleInjectionCode = `
						const style = document.createElement('style');
						style.innerHTML = \`${cssContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
						document.head.appendChild(style);
					`;
					console.log("#################\n", styleInjectionCode)
					return `${styleInjectionCode}\n${code}`;
				}
			}
			return null;
		},
	};
}
