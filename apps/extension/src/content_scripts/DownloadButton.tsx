import Communicator from "../shared/libs/Communicator.ts"
import { useEffect, useState } from "react"
type ButtonProps = {
	text: string,
	callback: (...args: any[]) => void,
	mediaElement: HTMLImageElement | HTMLVideoElement
}

export default function DownloadButton({ text, callback, mediaElement }: ButtonProps) {
	const [isClickable, setIsClickable] = useState(true)

	// Handlers
	function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		console.log("Hello button clicked!")
		callback()
	}

	// Hooks
	useEffect(() => {
		if (!isClickable) setTimeout(() => setIsClickable(true), 1500)
	}, [isClickable])

	return (
		<>
			<button style={{
				border: mediaElement instanceof HTMLVideoElement ? "2px dashed rgba(0,0,0,0.6)" : "1px solid black",
				backgroundColor: mediaElement.src.startsWith("blob:") ? "rgba(255,160,0,0.6)" : "rgba(180,180,180,0.6)",
				margin: "0px",
				padding: "0px",
				fontSize: "14px",
				pointerEvents: isClickable ? "auto" : "none",
				display: "block"
			}} onClick={onClick}
				onWheel={() => setIsClickable(false)}
			>{text}
			</button>
		</>
	)
}