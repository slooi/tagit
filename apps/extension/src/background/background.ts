import communicator, { Payload } from "../shared/utils/Communicator";
import MediaHelper from "../shared/utils/MediaHelper";

communicator.onMessage(async payload => {
	console.log("payload", payload)

	// append the formData 
	const formData = new FormData()
	appendFormData(formData, payload)

	// 
	await postToLocalhost(formData)
})

function appendFormData(formData: FormData, payload: Payload) {
	if (payload.file) formData.append("files", payload.file)
	if (payload.url) throw new Error("NOT IMPLEMENTED")

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
		throw new Error("ERROR when posting to localhost")
	}
}