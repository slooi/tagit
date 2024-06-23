browser.runtime.onMessage.addListener(msg => {
	console.log("onMessage msg:", msg)
})