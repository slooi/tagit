
export default class Communicator<T> {
	private static _instance: Communicator<any>

	private constructor() { }

	public static getInstance<T>(): Communicator<T> {
		return this._instance || (this._instance = new this<T>())
	}

	onMessage(cb: (payload: T, sender: browser.runtime.MessageSender, sendResponse: (response?: any) => void) => boolean | void | Promise<any>) {
		browser.runtime.onMessage.addListener(cb)
	}
	sendMessage(payload: T) {
		browser.runtime.sendMessage(payload)
	}
}