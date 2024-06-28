// 	/* 
// 	THERE ARE 3 SCENARIOS:
// 		1) data images. EG: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVQIHWNkYGD4xcDAyPCLgYHtFwAPzwL37iruMwAAAABJRU5ErkJggg==
// 		2) blob images. EG: blob:https://mangadex.org/7c3f6f93-79b2-4fc8-a407-1a381947181e
// 		3) normal url images. EG: https://mangadex.org/covers/5f824f8d-664b-4e1d-8257-efa2b19c294a/e26e8b68-d101-4280-8f59-74692780bb9d.jpg.256.jpg


// 		data images - get from 
// 		blob images - get from content_script. You get errors from bg.js 
// 		normal url images - get from background.js (cross origin)
// 	*/
export default class MediaHelper {
	// This downloads, data, blob and normal url images
	public static async getFileFromUrl(url: string) {
		try {
			// Get file
			const blob = await (await fetch(url)).blob()
			const file = new File([blob], MediaHelper.getImageNameFromUrl(url), { type: blob.type })

			return file
		} catch (err) { throw new Error("ERROR while trying to get file from blob!") }
	}

	// basic
	public static getImageTypeFromURL(url: string): ImageTypes {
		if (url.startsWith("blob:")) return ImageTypes.BLOB
		if (url.startsWith("data:")) return ImageTypes.DATA
		return ImageTypes.NORMAL
	}
	public static getImageNameFromUrl(url: string) {
		// If **DATA IMAGE** then return `data_${DATE}`
		if (url.startsWith("data:")) return `data_${Date.now()}`

		// Split the URL by '/' and get the last part
		const parts = url.split('/');
		let lastPart = parts[parts.length - 1];

		// Remove query parameters if they exist
		const queryParamIndex = lastPart.indexOf('?');
		if (queryParamIndex !== -1) lastPart = lastPart.substring(0, queryParamIndex);

		// Decode the URL-encoded string
		return decodeURIComponent(lastPart);
	}
}


// HELPER FUNCTIONS
export enum ImageTypes {
	BLOB = "BLOB",
	DATA = "DATA",
	NORMAL = "NORMAL"
}

