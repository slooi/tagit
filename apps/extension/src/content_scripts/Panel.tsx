import Button from "./Button.tsx"

type PanelProps = {
	image: HTMLImageElement
}
export default function Panel({ image }: PanelProps) {
	return (<>
		<Button />
		<Button />
		<Button />
	</>)
}