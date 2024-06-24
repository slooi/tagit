import { MediaElement } from "../shared/types/types.ts"
import Button from "./Button.tsx"

type PanelProps = {
	image: MediaElement
}
export default function Panel({ image }: PanelProps) {
	return (<>
		<Button />
		<Button />
		<Button />
	</>)
}