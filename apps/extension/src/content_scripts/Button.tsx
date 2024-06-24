import Communicator from "../shared/utils/Communicator.ts"
import { useEffect, useState } from "react"
type ButtonProps = {
	text: string
}

export default function Button({ text }: ButtonProps) {
	const [isClickable, setIsClickable] = useState(true)

	function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.stopPropagation()
		e.preventDefault()
		console.log("Hello button clicked!")
		Communicator.sendMessage(1)
		return false
	}

	useEffect(() => {
		if (!isClickable) setTimeout(() => setIsClickable(true), 1500)
	}, [isClickable])

	return (
		<>
			<button style={{
				border: "1px solid black",
				backgroundColor: "rgba(180,180,180,0.6)",
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