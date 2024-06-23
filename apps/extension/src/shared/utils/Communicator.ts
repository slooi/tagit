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

export type Payload = XOR<UrlPayload, FilePayload>
const communicator = Communicator.getInstance<Payload>()
export default communicator