class MediaDownloader {
	/* 
	THERE ARE 3 SCENARIOS:
		1) data images. EG: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVQIHWNkYGD4xcDAyPCLgYHtFwAPzwL37iruMwAAAABJRU5ErkJggg==
		2) blob images. EG: blob:https://mangadex.org/7c3f6f93-79b2-4fc8-a407-1a381947181e
		3) normal url images. EG: https://mangadex.org/covers/5f824f8d-664b-4e1d-8257-efa2b19c294a/e26e8b68-d101-4280-8f59-74692780bb9d.jpg.256.jpg


		data images - get from 
		blob images - get from content_script. You get errors from bg.js 
		normal url images - get from background.js (cross origin)
	*/

	private static _instance: MediaDownloader
	private static _urlToMedia: { [key: string]: Blob }

	private constructor() { }

	public static getInstance() {
		if (!this._instance) {
			this._urlToMedia = {}
			this._instance = new this()
		}
		return this._instance
	}

	public static async sendRequest(url: string) {
		switch (getImageType(url)) {
			case ImageTypes.BLOB:
				return await this._getBlob(url)
				break;
			case ImageTypes.DATA:
				throw new Error("NOT IMPLEMENTED")
				break;
			case ImageTypes.NORMAL:
				throw new Error("NOT IMPLEMENTED")
				break;
			default:
				throw new Error("ERROR: MediaDownloader can NOT handle this url type")
		}
	}

	public static getBlob(url: string) {
		return MediaDownloader._urlToMedia[url]
	}

	// PRIVATE STRATEGIES
	private static async _getBlob(url: string) {
		// Get blob
		const res = await fetch(url)
		const blobResponse = await res.blob()

		// Save and return blob
		MediaDownloader._urlToMedia[url] = blobResponse
		return blobResponse
	}
}


// HELPER FUNCTIONS
enum ImageTypes {
	BLOB = "BLOB",
	DATA = "DATA",
	NORMAL = "NORMAL"
}

function getImageType(url: string): ImageTypes {
	if (url.startsWith("blob:")) return ImageTypes.BLOB
	if (url.startsWith("data:")) return ImageTypes.DATA
	return ImageTypes.NORMAL
}