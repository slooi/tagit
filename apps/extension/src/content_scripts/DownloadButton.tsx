import { ORANGE_ALPHA } from "../shared/constants/color.ts"
import Communicator from "../shared/libs/Communicator.ts"
import { useEffect, useState } from "react"
type ButtonProps = {
	text: string,
	callback: (...args: any[]) => void,
	mediaElement: HTMLImageElement | HTMLVideoElement
}

export default function DownloadButton({ text, callback, mediaElement }: ButtonProps) {
	// Handlers
	function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		console.log("Hello button clicked!")
		callback()
	}

	return (
		<>
			<button style={{
				border: mediaElement instanceof HTMLVideoElement ? "2px dashed rgba(0,0,0,0.6)" : "1px solid black",
				backgroundColor: mediaElement.src.startsWith("blob:") ? ORANGE_ALPHA : "rgba(180,180,180,0.6)",
				margin: "0px",
				padding: "0px",
				fontSize: "14px",
				pointerEvents: "auto",
				display: "block"
			}} onClick={onClick}
			>{text}
			</button>
		</>
	)
}