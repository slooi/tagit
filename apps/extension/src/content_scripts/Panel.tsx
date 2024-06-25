import { MediaElement } from "../shared/types/types.ts"
import communicator from "../shared/utils/Communicator.ts"
import Button from "./Button.tsx"

// constants
import tags from "../shared/constants/tags.config.ts"
import { useEffect, useState } from "react"

// 
type PanelProps = {
	mediaElement: MediaElement
}
export default function Panel({ mediaElement }: PanelProps) {
	const [blob, setBlob] = useState<Blob>()

	const boudingClientRect = mediaElement.getBoundingClientRect()
	if (boudingClientRect.bottom < 0 || boudingClientRect.top > window.innerHeight) return <></>

	const handleClick = async (tag: typeof tags[number]) => {

		if (!blob) {
			// fetch blob
			try {
				console.log("SENDING")
				const res = await fetch("https://images.squarespace-cdn.com/content/v1/5f90ff6a5f71bf45a0c0256c/1606871553343-3NUCEHB5S1N3VAEVSLGT/autism+bubble.jpg")
				const blobResponse = await res.blob()

				console.log("I HAVE THE BLOB")
				setBlob(blobResponse)
			} catch (err) {
				throw new Error("ERROR: " + err)
			}
		}

		if (blob) {
			communicator.sendMessage({
				blob: blob,
				tags: [tag],
			})
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
					<Button key={tag} text={tag} callback={() => handleClick(tag)
					} />
				))}
			</div>
		</>)
}