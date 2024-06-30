import { MediaElement } from "../shared/types/types.ts"
import communicator, { Payload } from "../shared/utils/Communicator.ts"
import DownloadButton from "./DownloadButton.tsx"

// constants
import tags from "../shared/constants/tags.config.ts"
import MediaHelper, { ImageTypes } from "../shared/utils/MediaHelper.ts"

// 
type PanelProps = {
	mediaElement: MediaElement
}
export default function Panel({ mediaElement }: PanelProps) {

	// Check if panel should display
	const boudingClientRect = mediaElement.getBoundingClientRect()
	if (boudingClientRect.bottom < 0 || boudingClientRect.top > window.innerHeight) return <></>


	// HANDLERS
	const sendPayloadToBackground = async (tag: typeof tags[number]) => {
		const url = mediaElement.src

		// Create the payload based on image type.
		let payload: Payload | undefined;
		switch (mediaElement.nodeName) {
			case "VIDEO":

				break;
			case "IMG":
				const imageType = MediaHelper.getImageTypeFromURL(url);

				const imageIsDataOrBlob = imageType === ImageTypes.DATA || imageType === ImageTypes.BLOB
				const imageIsNormal = imageType === ImageTypes.NORMAL

				if (imageIsDataOrBlob) payload = { file: await MediaHelper.getFileFromUrl(url), tags: [tag] }
				if (imageIsNormal) payload = { url, tags: [tag] }
				break;
			default:
				throw new Error(`ERROR: unexpected mediaElement.nodeName is unexpected! mediaElement.nodeName: ${mediaElement.nodeName}`)
		}
		if (!payload) throw new Error(`Invalid payload!`)

		// Send the payload.
		communicator.sendMessage(payload);
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