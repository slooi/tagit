import { useEffect, useState } from "react"
import Panel from "./Panel"

// Types
import { MediaElement } from "../shared/types/types"

// Constants
const SMALLEST_MEDIA_DIMENSION = 80
const LARGEST_MEDIA_DIMENSION = 150

export default function App() {
	console.log("content_scripts.ts app ran")
	const [images, setImages] = useState<MediaElement[]>([...document.querySelectorAll("img")])

	useEffect(() => {
		const interval = setInterval(() => setImages(
			[...document.querySelectorAll("img,video")].filter(el => (el.clientWidth >= LARGEST_MEDIA_DIMENSION && el.clientHeight >= SMALLEST_MEDIA_DIMENSION) || (el.clientWidth >= SMALLEST_MEDIA_DIMENSION && el.clientHeight >= LARGEST_MEDIA_DIMENSION)) as MediaElement[]
		), 333)
		return () => clearTimeout(interval)
	}, [])

	return (<>{images.map((image, i) => <Panel key={i} image={image} />)}</>)
}