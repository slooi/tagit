import { MediaElement } from "../shared/types/types.ts"
import communicator from "../shared/utils/Communicator.ts"
import DownloadButton from "./DownloadButton.tsx"

// constants
import tags from "../shared/constants/tags.config.ts"
import { useEffect, useState } from "react"
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

		switch (MediaHelper.getImageTypeFromURL(url)) {
			case ImageTypes.BLOB: {
				const file = await MediaHelper.getFileFromBlobUrl(url)
				communicator.sendMessage({ file, tags: [tag] })
				break;
			}
			case ImageTypes.DATA: {
				const file = await MediaHelper.getFileFromDataUrl(url)
				communicator.sendMessage({ file, tags: [tag] })
				break;
			}
			case ImageTypes.NORMAL: {
				console.log("heyheya!")
				communicator.sendMessage({ url, tags: [tag] })
				break;
			}
			default:
				throw new Error("THIS SHOULD NEVER RUN!")
		}
	}

	return (
		<>
			<div style={{
				position: "absolute",
				top: boudingClientRect.y + scrollY,
				left: boudingClientRect.x + scrollX,
				pointerEvents: "none",
			}}
			>
				{tags.map(tag => (
					<DownloadButton key={tag} text={tag} callback={() => sendPayloadToBackground(tag)} mediaElement={mediaElement} />
				))}
			</div>
		</>)
}