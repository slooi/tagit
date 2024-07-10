import { useEffect, useState } from "react"
import Panel from "./Panel"

// Types
import { MediaElement } from "@tagit/shared"

// Constants
const SMALLEST_MEDIA_DIMENSION = 80
const LARGEST_MEDIA_DIMENSION = 150

export default function App() {
	const [mediaElements, setMediaElement] = useState<MediaElement[]>(getMediaElements())
	const [showPanels, setShowPanels] = useState(true)
	const keyHandler = (e: KeyboardEvent, isDown: boolean) => {
		if (e.key === "Alt" && isDown) setShowPanels(!showPanels)
	}
	window.addEventListener("keydown", e => keyHandler(e, true))
	window.addEventListener("keyup", e => keyHandler(e, false))

	function getMediaElements() {
		return [...document.querySelectorAll("img,video")].filter(el => {
			const isAboveMinimumDimensions = ((el.clientWidth >= LARGEST_MEDIA_DIMENSION && el.clientHeight >= SMALLEST_MEDIA_DIMENSION) || (el.clientWidth >= SMALLEST_MEDIA_DIMENSION && el.clientHeight >= LARGEST_MEDIA_DIMENSION))
			const isNotTooCloseToRightWindowEdge = el.getBoundingClientRect().x < (window.innerWidth - 20)

			return isAboveMinimumDimensions && isNotTooCloseToRightWindowEdge
		}) as MediaElement[]
	}

	useEffect(() => {
		const interval = setInterval(() => { setMediaElement(getMediaElements()) }, 100)
		return () => clearTimeout(interval)
	}, [])

	const hasTwitterOverlay = document.querySelectorAll("[data-testid=mask]")[0]
	return (<>
		{
			showPanels ? (

				hasTwitterOverlay ? (
					filterForLargestImageOnScreen(mediaElements) && <Panel mediaElement={filterForLargestImageOnScreen(mediaElements)} />
				) : (
					mediaElements.map((mediaElement, i) => <Panel key={i} mediaElement={mediaElement} />)
				)
			) : <></>
		}
	</>)
}

function filterForLargestImageOnScreen<T extends MediaElement>(mediaElements: T[]): T {
	let largestArea = 0
	let largestMediaElement = mediaElements[0]
	mediaElements.forEach(mediaElement => {
		const area = mediaElement.clientHeight * mediaElement.clientWidth
		const rect = mediaElement.getBoundingClientRect()
		if (area > largestArea) {
			if (boxCollision(0, 0, innerWidth, innerHeight, rect.x, rect.y, rect.width, rect.height)) {
				largestMediaElement = mediaElement
				largestArea = area
			}
		}
	})
	return largestMediaElement
}

function boxCollision(x0: number, y0: number, w0: number, h0: number, x1: number, y1: number, w1: number, h1: number) {
	return (x0 + 400 < x1 + w1 && y0 + 400 < y1 + h1 && x0 + w0 - 400 > x1 && y0 + h0 - 400 > y1) ? true : false
}