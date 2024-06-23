type Payload = number

export default abstract class Communicator {
	public static onMessage(cb: (payload: Payload, sender: browser.runtime.MessageSender, sendResponse: (response?: any) => void) => boolean | void | Promise<any>) {
		browser.runtime.onMessage.addListener(cb)
	}
	public static sendMessage(payload: Payload) {
		browser.runtime.sendMessage(payload)
	}
}