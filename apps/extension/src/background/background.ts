import communicator from "../shared/utils/Communicator";

communicator.onMessage(payload => {
	console.log("payload", payload)
	const formData = new FormData()

	formData.append("files", payload.blob || payload.url)

	fetch("http://localhost:8085/save/attached-media", {
		method: "POST",
		body: formData,
	})
})