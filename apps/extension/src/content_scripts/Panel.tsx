import { MediaElement } from "../shared/types/types.ts"
import Button from "./Button.tsx"

type PanelProps = {
	mediaElement: MediaElement
}
export default function Panel({ mediaElement }: PanelProps) {

	const boudingClientRect = mediaElement.getBoundingClientRect()

	return (
		<>
			<div style={{
				position: "absolute"
			}}>
				<Button />
				<Button />
				<Button />
			</div>
		</>)
}