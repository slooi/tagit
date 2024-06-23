export default function Button() {
	function onClick() {
		console.log("Hello button clicked!")
		browser.runtime.sendMessage("asd")
	}
	return (<><button onMouseDown={onClick}>I'm a button</button></>)
}