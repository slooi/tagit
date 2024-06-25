import tags from "../constants/tags.config";
import Communicator from "../libs/Communicator";
import { XOR } from "../types/types";


export type UrlPayload = {
	url: string,
	tags: typeof tags[number][]
}

export type FilePayload = {
	file: File,
	tags: typeof tags[number][]
}

const communicator = Communicator.getInstance<XOR<UrlPayload, FilePayload>>()
export default communicator