import { ORANGE_ALPHA } from "@tagit/shared"

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
	console.log("isDarkMode()", isDarkMode())
	return (
		<>
			<button style={{
				border: mediaElement instanceof HTMLVideoElement ? "2px dashed rgba(0,0,0,0.6)" : "1px solid black",
				backgroundColor: mediaElement.src.startsWith("blob:") ? ORANGE_ALPHA : isDarkMode() ? "rgba(110,110,110,0.7)" : "rgba(200,200,200,0.7)",
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


function isDarkMode() {
	const element = document?.head?.querySelector("[name~=theme-color][content]")
	return element?.getAttribute("content") === "#000000" // ts-ignore
}