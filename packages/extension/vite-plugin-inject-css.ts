import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

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
					const hash = crypto.createHash('md5').update(id).digest('hex').slice(0, 8);
					const uniqueCssContent = addUniqueClassNames(cssContent, hash);
					const updatedCode = updateClassNamesInCode(code, hash);

					const styleInjectionCode = `
                        const style = document.createElement('style');
                        style.innerHTML = \`${uniqueCssContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
                        document.head.appendChild(style);
                    `;
					console.log("##########################\n", `${styleInjectionCode}\n${updatedCode}`)
					return `${styleInjectionCode}\n${updatedCode}`;
				}
			}
			return null;
		},
	};
}

function addUniqueClassNames(cssContent: string, hash: string): string {
	return cssContent.replace(/(\.[a-zA-Z_-][a-zA-Z0-9_-]*)/g, `$1-${hash}`);
}

function updateClassNamesInCode(code: string, hash: string): string {
	return code.replace(/className(?::\s*|\s*=\s*)(?:["'`]([^"'`]+)["'`]|\{["'`]([^"'`]+)["'`]\})/g, (match, classNames1, classNames2) => {
		const classNames = classNames1 || classNames2;
		const updatedClassNames = classNames.split(' ').map((className: string) => `${className}-${hash}`).join(' ');
		if (match.includes(':')) {
			return `className: "${updatedClassNames}"`;
		} else {
			return `className={"${updatedClassNames}"}`;
		}
	});
}