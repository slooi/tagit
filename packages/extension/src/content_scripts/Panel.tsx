import { MediaElement } from "@tagit/shared"
import { communicator } from "@tagit/shared"
import DownloadButton from "./DownloadButton.tsx"

// constants
import { tags } from "@tagit/shared"
import { MediaHelper, Payload, Stages } from "@tagit/shared"

// 
type PanelProps = {
	mediaElement: MediaElement
}
const mediaHelper = MediaHelper.getInstance(Stages.CONTENT_SCRIPT)
export default function Panel({ mediaElement }: PanelProps) {

	// Check if panel should display
	const boudingClientRect = mediaElement.getBoundingClientRect()
	if (boudingClientRect.bottom < 0 || boudingClientRect.top > window.innerHeight) return <></>


	// HANDLERS
	const sendPayloadToBackground = async (tag: typeof tags[number]) => {
		const url = mediaElement.src
		if (url === "") throw new Error("ERROR url is not valid")

		// Create the payload based on image type.
		let payload: Payload = {
			stageToDownloadMedia: MediaHelper.determineStageToDownloadMedia(mediaElement),
			tags: [tag],
			url: MediaHelper.processUrlBasedOnSide(url),
			file: undefined
		};
		console.log("payload", payload) //!@#!@# remove later
		// Potentially process
		await mediaHelper.potentiallyProcessPayload(payload)

		console.log("communicator.sendMessage", communicator.sendMessage) //!@#!@# remove later
		// Send the payload.
		communicator.sendMessage(payload)

		// Like the image if on x/twitter domain
		if (window.origin.replace(/^.*\:\/\//, "") === "x.com" || window.origin.replace(/^.*\:\/\//, "") === "twitter.com") {
			const commonParent = findCommonParentQuerySelector(mediaElement, '[role=button][data-testid="retweet"]')
			if (!commonParent) console.warn("WARNING: no common parent found for this element", mediaElement)
			const likeBtn = commonParent?.querySelectorAll('[data-testid="like"]')[0] as HTMLElement | undefined
			likeBtn?.click()
		}
	}
	const PREVENT_OVERFLOW = true
	return (
		<>
			<div style={{
				position: "absolute",
				top: boudingClientRect.y + scrollY,
				left: boudingClientRect.x + scrollX,
				// backgroundColor: "pink",
				overflowY: PREVENT_OVERFLOW ? "hidden" : "auto",
				height: PREVENT_OVERFLOW ? mediaElement.getBoundingClientRect().height + "px" : "auto"
			}}
			>
				{tags.map(tag => (
					<DownloadButton key={tag} text={tag} callback={() => sendPayloadToBackground(tag)} mediaElement={mediaElement} />
				))}
			</div>
		</>)
}

function findClosestRetweetBtn(el: HTMLElement | undefined) {
	let foundElements = []
	let elementAncestor: HTMLElement | undefined = el
	if (!elementAncestor) throw new Error("elementAncestor is undefined!")
	let numberOfChecks = 0
	while (true) {
		foundElements = [...elementAncestor.querySelectorAll("[role='button'][data-testid='retweet']")] as (HTMLElement[] | [])
		if (foundElements.length > 0) return foundElements[0]
		if (numberOfChecks > 200) throw new Error("ERROR: COULD NOT FIND CLOSEST REPOSTS")
		elementAncestor = elementAncestor.parentElement ? elementAncestor.parentElement : undefined
		if (!elementAncestor) throw new Error("ERROR: elementAncestor is undefined!")
		numberOfChecks++
	}
}

function findCommonParentQuerySelector(e0: HTMLElement | undefined, query: string) {
	let e0Ancestor: HTMLElement | undefined = e0
	while (e0Ancestor !== undefined) {
		if (e0Ancestor.querySelectorAll(query).length > 0) return e0Ancestor
		e0Ancestor = e0Ancestor.parentElement ? e0Ancestor.parentElement : undefined
	}
	return undefined
}
function findCommonParent(e0: HTMLElement | undefined, e1: HTMLElement | undefined) {
	if (!e1) return undefined

	let e0Ancestor: HTMLElement | undefined = e0
	while (e0Ancestor !== undefined) {
		if (e0Ancestor.contains(e1)) return e0Ancestor
		e0Ancestor = e0Ancestor.parentElement ? e0Ancestor.parentElement : undefined
	}
	return undefined
}