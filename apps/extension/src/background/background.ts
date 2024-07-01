import communicator from "../shared/utils/Communicator";
import MediaHelper, { Stages } from "../shared/utils/MediaHelper";

browser.webRequest.onBeforeRequest.addListener(
	requestDetails => {
		console.log(`Request: ${requestDetails.method} ${requestDetails.url}`);
	},
	{ urls: ["<all_urls>"] },
);

const mediaHelper = MediaHelper.getInstance(Stages.BACKGROUND_SCRIPT)

communicator.onMessage(async payload => {
	console.log("payload", payload)

	// Create and populate formData 
	const formData = new FormData()
	await mediaHelper.populateFormData(formData, payload)

	// Post
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
		throw new Error(`ERROR when posting to localhost. err: ${err}`)
	}
}