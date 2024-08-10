1. How to setup monorepo to have intellisense:
- create a `pnpm-workspace.yaml` <= it is NOT pural
- create a barrel file (`index.ts`) in the root of the pkg you want to export
- make sure to rename the pkg to `@tagit/shared` 
- VALIDATE all previous step were done correctly `pnpm ls -r -depth -1`
- install it into another pkg: `pnpm --filter extension i @tagit/shared --workspace` <= make sure it's not `tagit@shared` lol
- You can valide correct installation by checking the `node_modules` and the `package.json`

2. When making extensions remember to install
"@types/firefox-webext-browser": "^120.0.4",
"@types/node": 

3. pixiv requires a referer header, however you can NOT set the referer header in a request in the content_script and the background_scirpt using normal api. Thus you need to use the `webRequest` api:
```js
browser.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		let newHeaders = details?.requestHeaders?.filter(header => header.name.toLowerCase() !== 'referer');
		newHeaders?.push({ name: 'Referer', value: 'https://i.pximg.net/' });
		return { requestHeaders: newHeaders };
	},
	{ urls: ["https://*.pximg.net/*"] },
	["blocking", "requestHeaders"]
);
```

# Improvements for the future
1. Need something better than chokidar. I need something which is more efficient and faster.
2. Create a DECLARATIVE interface so you can change stuff for each website for different parts of the tagit pipeline. This would be preferable over hard coding things in the code like how it's currently done. Declarative configuration would be robust to change and would scale, imperative configuration for all the sites would NOT scale. Build systems then let declarative config interface with that.
Possible config:
- stage for downloading image/video (content_script,background_script,server)
- easy to manipulate url:
```
		if (url.match(/pximg.net/)) return url.replace(/img-master(.*?)_master\d+(.*?)/, "img-original$1$2")
```
- can easily look at surrounding html if need be to find url to request for
- can easily define