
export default class Communicator<Payload> {
	private static _instance: Communicator<unknown>

	private constructor() { }

	public static getInstance<Payload>() {
		return this._instance || (this._instance = new this<Payload>())
	}

	onMessage(cb: (payload: Payload, sender: browser.runtime.MessageSender, sendResponse: (response?: any) => void) => boolean | void | Promise<any>) {
		browser.runtime.onMessage.addListener(cb)
	}
	sendMessage(payload: Payload) {
		browser.runtime.sendMessage(payload)
	}
}