import { MediaElement } from "../shared/types/types.ts"
import communicator from "../shared/utils/Communicator.ts"
import DownloadButton from "./DownloadButton.tsx"

// constants
import tags from "../shared/constants/tags.config.ts"
import { useEffect, useState } from "react"

// 
type PanelProps = {
	mediaElement: MediaElement
}
export default function Panel({ mediaElement }: PanelProps) {
	const [blob, setBlob] = useState<Blob>()

	// Check if panel should display
	const boudingClientRect = mediaElement.getBoundingClientRect()
	if (boudingClientRect.bottom < 0 || boudingClientRect.top > window.innerHeight) return <></>

	// 
	// if (mediaElement.src === "") containerStyle.backgroundColor = "rgba(255,0,0,0.6)"
	// if (mediaElement.src.startsWith("blob:")) containerStyle.backgroundColor = "rgba(255,160,0,0.6)"
	// if (mediaElement instanceof HTMLVideoElement) containerStyle.border = "2px dashed rgba(0,0,0,0.6)"

	// HANDLERS
	const handleClick = async (tag: typeof tags[number]) => {
		if (!blob) {
			// fetch blob
			try {
				console.log("SENDING")
				const res = await fetch(mediaElement.src)
				const blobResponse = await res.blob()

				console.log("I HAVE THE BLOB")
				setBlob(blobResponse)
			} catch (err) { throw new Error("ERROR: " + err) }
		}

		blob && communicator.sendMessage({ blob: blob, tags: [tag] })
	}

	// Style
	const containerStyle = {
		position: "absolute",
		top: boudingClientRect.y + scrollY,
		left: boudingClientRect.x + scrollX,
		pointerEvents: "none",
	} as React.CSSProperties

	return (
		<>
			<div style={containerStyle}
			>
				{tags.map(tag => (
					<DownloadButton key={tag} text={tag} callback={() => handleClick(tag)} />
				))}
			</div>
		</>)
}