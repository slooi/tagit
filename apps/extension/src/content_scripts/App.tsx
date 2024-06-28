import { useEffect, useState } from "react"
import Panel from "./Panel"

// Types
import { MediaElement } from "../shared/types/types"

// Constants
const SMALLEST_MEDIA_DIMENSION = 80
const LARGEST_MEDIA_DIMENSION = 150

export default function App() {
	const [mediaElements, setMediaElement] = useState<MediaElement[]>(getMediaElements())

	function getMediaElements() {
		return [...document.querySelectorAll("img,video")].filter(el => ((el.clientWidth >= LARGEST_MEDIA_DIMENSION && el.clientHeight >= SMALLEST_MEDIA_DIMENSION) || (el.clientWidth >= SMALLEST_MEDIA_DIMENSION && el.clientHeight >= LARGEST_MEDIA_DIMENSION)) && el.getBoundingClientRect().x < (window.innerWidth - 20)) as MediaElement[]
	}

	useEffect(() => {
		const interval = setInterval(() => { setMediaElement(getMediaElements()) }, 100)
		return () => clearTimeout(interval)
	}, [])

	return (<>{mediaElements.map((mediaElement, i) => <Panel key={i} mediaElement={mediaElement} />)}</>)
}