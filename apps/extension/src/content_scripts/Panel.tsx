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
	const handleClick = async (tag: typeof tags[number]) => {
		const url = mediaElement.src
		if (MediaHelper.getImageTypeFromURL(url) === ImageTypes.BLOB) {
			const file = await MediaHelper.getFileFromBlobUrl(url)
			communicator.sendMessage({ file, tags: [tag] })
		} else {
			communicator.sendMessage({ url, tags: [tag] })
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
					<DownloadButton key={tag} text={tag} callback={() => handleClick(tag)} mediaElement={mediaElement} />
				))}
			</div>
		</>)
}