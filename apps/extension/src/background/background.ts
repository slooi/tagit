import communicator from "../shared/utils/Communicator";

communicator.onMessage(payload => {
	console.log("payload", payload)
	fetch("http://localhost:8085/save/attached-media", {
		method: "POST"
	})
})