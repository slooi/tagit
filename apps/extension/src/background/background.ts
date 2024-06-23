import communicator, { Payload } from "../shared/utils/Communicator";
import MediaHelper from "../shared/utils/MediaHelper";

communicator.onMessage(async payload => {
	console.log("payload", payload)

	// Create and populate formData 
	const formData = new FormData()
	await populateFormData(formData, payload)

	// Post
	await postToLocalhost(formData)
})

async function populateFormData(formData: FormData, payload: Payload) {
	console.log("payload", payload)
	// Add file
	if (payload.file) formData.append("files", payload.file)
	if (payload.url) {
		const file = await MediaHelper.getFileFromUrl(payload.url)
		formData.append("files", file)
	}

	// Add tags
	payload.tags.forEach(tag => {
		formData.append("tags[]", tag)
	})
}

async function postToLocalhost(formData: FormData) {
	try {
		const res = await fetch("http://localhost:8085/save/attached-media", {
			method: "POST",
			body: formData,
		})
		console.log("Posted image and tags successfully")
		return res
	} catch (err) {
		throw new Error(`ERROR when posting to localhost. err: ${err}`)
	}
}