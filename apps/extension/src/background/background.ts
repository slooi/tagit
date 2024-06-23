import Communicator from "../shared/Communicator";

Communicator.onMessage(payload => console.log("payload", payload))