import communicator from "../shared/utils/Communicator";
import MediaHelper from "../shared/utils/MediaHelper";

communicator.onMessage(async payload => {
	console.log("payload", payload)

	// append the file 
	const formData = new FormData()
	if (payload.file) {
		formData.append("files", payload.file)
	} else if (payload.url) {
		// MediaHelper.
		throw new Error("NOT IMPLEMENTED")
	} else {
		throw new Error("NOT IMPLEMENTED")
	}
	// formData.append("tags", new Blob(payload.tags, { type: "text/plain" }))

	// 
	await postToLocalhost(formData)
})

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