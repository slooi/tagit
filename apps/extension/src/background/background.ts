// import background2 from "./background2"

console.log("0 details")
browser.webNavigation.onCompleted.addListener(details=>{
	browser.tabs.executeScript(details.tabId,{
		file: "./background2.js"
	})
	console.log("details",details)
})

// background2()
// console.log("background.ts here!2")

// browser.tabs.executeScript
// browser.scripting.executeScript