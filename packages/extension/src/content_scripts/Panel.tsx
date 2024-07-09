import { MediaElement } from "../shared/types/types.ts"
import communicator from "../shared/utils/Communicator.ts"
import DownloadButton from "./DownloadButton.tsx"

// constants
import tags from "../shared/constants/tags.config.ts"
import MediaHelper, { Payload, Stages } from "../shared/utils/MediaHelper.ts"

// 
type PanelProps = {
	mediaElement: MediaElement
}
const mediaHelper = MediaHelper.getInstance(Stages.CONTENT_SCRIPT)
export default function Panel({ mediaElement }: PanelProps) {

	// Check if panel should display
	const boudingClientRect = mediaElement.getBoundingClientRect()
	if (boudingClientRect.bottom < 0 || boudingClientRect.top > window.innerHeight) return <></>


	// HANDLERS
	const sendPayloadToBackground = async (tag: typeof tags[number]) => {
		const url = mediaElement.src
		if (url === "") throw new Error("ERROR url is not valid")

		// Create the payload based on image type.
		let payload: Payload = {
			stageToDownloadMedia: MediaHelper.determineStageToDownloadMedia(mediaElement),
			tags: [tag],
			url: url,
			file: undefined
		};
		console.log("payload", payload) //!@#!@# remove later
		// Potentially process
		await mediaHelper.potentiallyProcessPayload(payload)

		console.log("communicator.sendMessage", communicator.sendMessage) //!@#!@# remove later
		// Send the payload.
		communicator.sendMessage(payload)
	}

	return (
		<>
			<div style={{
				position: "absolute",
				top: boudingClientRect.y + scrollY,
				left: boudingClientRect.x + scrollX,
			}}
			>
				{tags.map(tag => (
					<DownloadButton key={tag} text={tag} callback={() => sendPayloadToBackground(tag)} mediaElement={mediaElement} />
				))}
			</div>
		</>)
}