import Communicator from "../shared/Communicator.ts"

export default function Button() {
	function onClick() {
		console.log("Hello button clicked!")
		Communicator.sendMessage(1)
	}
	return (<><button onMouseDown={onClick}>I'm a button</button></>)
}