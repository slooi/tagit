import Communicator from "../shared/Communicator";

Communicator.onMessage(payload => {
	console.log("payload", payload)
	fetch("http://localhost:8085/save/attached-media", {
		method: "POST"
	})
})

