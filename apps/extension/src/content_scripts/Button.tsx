import Communicator from "../shared/utils/Communicator.ts"

export default function Button() {
	function onClick() {
		console.log("Hello button clicked!")
		Communicator.sendMessage(1)
	}
	return (<><button style={{
		border: "1px solid black",
		backgroundColor: "rgba(180,180,180,0.6)",
		margin: "0px",
		padding: "0px",
		fontSize: "15px",
		pointerEvents: "auto"
	}} onMouseDown={onClick}>I'm a button</button></>)
}