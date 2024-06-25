import { MediaElement } from "../shared/types/types.ts"
import communicator from "../shared/utils/Communicator.ts"
import Button from "./Button.tsx"

// constants
import tags from "../shared/constants/tags.config.ts"

// 
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
			}}
			>
				{tags.map(tag => (
					<Button key={tag} text={tag} callback={(() => communicator.sendMessage(tag))} />
				))}
			</div>
		</>)
}