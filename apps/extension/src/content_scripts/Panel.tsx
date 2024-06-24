import { MediaElement } from "../shared/types/types.ts"
import Button from "./Button.tsx"

type PanelProps = {
	mediaElement: MediaElement
}
export default function Panel({ mediaElement }: PanelProps) {

	const boudingClientRect = mediaElement.getBoundingClientRect()
	if (boudingClientRect.bottom < 0 || boudingClientRect.top > window.innerHeight) return <></>

	return (
		<>
			<div style={{
				position: "absolute",
				top: boudingClientRect.y + scrollY,
				left: boudingClientRect.x + scrollX,
				pointerEvents: "none",
				// backgroundColor: "red"
			}}
			>
				<Button text={"just nice"} />
				<Button text={"ro just nice"} />
				<Button text={"inspiration"} />
				<Button text={"ro inspiration"} />
				<Button text={"drawing resources"} />
				<Button text={"real drawing resources"} />
				<Button text={"nh real drawing resources"} />
				<Button text={"programming inspiration"} />
			</div>
		</>)
}