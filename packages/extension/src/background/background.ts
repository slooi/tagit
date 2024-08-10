import { communicator } from "@tagit/shared"
import { MediaHelper, Stages } from "@tagit/shared"

browser.webRequest.onBeforeRequest.addListener(
	requestDetails => {
		console.log(`Request: ${requestDetails.method} ${requestDetails.url}`);
	},
	{ urls: ["<all_urls>"] },
);
browser.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		let newHeaders = details?.requestHeaders?.filter(header => header.name.toLowerCase() !== 'referer');
		newHeaders?.push({ name: 'Referer', value: 'https://i.pximg.net/' });
		return { requestHeaders: newHeaders };
	},
	{ urls: ["https://*.pximg.net/*"] },
	["blocking", "requestHeaders"]
);
const mediaHelper = MediaHelper.getInstance(Stages.BACKGROUND_SCRIPT)

communicator.onMessage(async payload => {
	console.log("payload", payload)
	try {
		// Create and populate formData 
		const formData = new FormData()
		await mediaHelper.populateFormData(formData, payload)

		// Post
		await postToLocalhost(formData)
	} catch (err) {
		throw new Error("ERROR: while during to `populate and postToLocalhost`. info: " + err)
	}
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