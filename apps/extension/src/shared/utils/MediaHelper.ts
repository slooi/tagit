// 	/* 
// 	THERE ARE 3 SCENARIOS:
// 		1) data images. EG: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVQIHWNkYGD4xcDAyPCLgYHtFwAPzwL37iruMwAAAABJRU5ErkJggg==
// 		2) blob images. EG: blob:https://mangadex.org/7c3f6f93-79b2-4fc8-a407-1a381947181e
// 		3) normal url images. EG: https://mangadex.org/covers/5f824f8d-664b-4e1d-8257-efa2b19c294a/e26e8b68-d101-4280-8f59-74692780bb9d.jpg.256.jpg

import tags from "../constants/tags.config"

export enum Stages {
	CONTENT_SCRIPT = "CONTENT_SCRIPT",
	BACKGROUND_SCRIPT = "BACKGROUND_SCRIPT",
	SERVER = "SERVER"
}

export enum ImageTypes {
	BLOB = "BLOB",
	DATA = "DATA",
	NORMAL = "NORMAL"
}

export type Payload = {
	stageToDownloadMedia: Stages
	url: string,
	tags: typeof tags[number][]
	file?: File,
}

// 		data images - get from 
// 		blob images - get from content_script. You get errors from bg.js 
// 		normal url images - get from background.js (cross origin)
// 	*/
export default class MediaHelper {

	private static _instance: MediaHelper;
	private static _stage: Stages;

	private constructor() { }

	public static getInstance(stage: Stages) {
		if (this._instance) return this._instance
		this._instance = new this()
		this._stage = stage
		return this._instance
	}

	// This downloads, data, blob and normal url images
	public static async getFileFromUrl(url: string) {
		try {
			// Get file
			const blob = await (await fetch(url)).blob()
			const file = new File([blob], MediaHelper.getImageNameFromUrl(url), { type: blob.type })

			return file
		} catch (err) { throw new Error("ERROR while trying to get file from url!") }
	}



	/* 
	HELPER FUNCTIONS   probably move into utils class later
	*/
	public static determineStageToDownloadMedia(mediaElement: HTMLImageElement | HTMLVideoElement) {
		/* 
			VIDEOS => server
	
			IMAGES
			data => content_script
			blob => content_script
			url => background_script
		*/
		if (mediaElement instanceof HTMLVideoElement) return Stages.SERVER
		if (mediaElement instanceof HTMLImageElement) {
			const imageType = MediaHelper.getImageTypeFromURL(mediaElement.src);
			const imageIsDataOrBlob = imageType === ImageTypes.DATA || imageType === ImageTypes.BLOB
			const imageIsNormal = imageType === ImageTypes.NORMAL

			if (imageIsDataOrBlob) return Stages.CONTENT_SCRIPT
			if (imageIsNormal) return Stages.BACKGROUND_SCRIPT
		}
		throw new Error(`ERROR: something unexpected happened! mediaElement: ${mediaElement.src}`)
	}

	public async potentiallyProcessPayload(payload: Payload) {
		console.log("potentiallyProcessPayload ran")

		// Exit if not time to process payload
		if (payload.stageToDownloadMedia !== MediaHelper._stage) return

		payload.file = await MediaHelper.getFileFromUrl(payload.url)
	}

	public async populateFormData(formData: FormData, payload: Payload) {
		if (MediaHelper._stage !== Stages.BACKGROUND_SCRIPT) throw new Error("tHIS METHOD SHOULD ONLY WORK FOR BACKGROUND SCRIPTS!")

		// Add files
		await this.potentiallyProcessPayload(payload)
		if (!payload.file) throw new Error("ERROR file does NOT exist!")
		formData.append("files", payload.file)

		// Add tags
		payload.tags.forEach(tag => {
			formData.append("tags[]", tag)
		})
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