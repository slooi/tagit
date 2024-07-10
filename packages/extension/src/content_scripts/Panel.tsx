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


		// Check if full screen image
		const isFullScreened = document.querySelectorAll("[data-testid=mask]")[0] as HTMLElement | undefined
		if (isFullScreened) {
			const image = document.querySelectorAll('[alt=Image]')[0] as HTMLElement | undefined
			const retweetButton = document.querySelectorAll('[data-testid="retweet"]')[0] as HTMLElement | undefined
			const commonParent = findCommonParent(image, retweetButton)
			const likes = commonParent?.querySelectorAll('[data-testid="like"]')[0] as HTMLElement | undefined
			// Like the image
			likes?.click()
		} else {
			// Like the image
			const likeButton = document.querySelectorAll("[data-testid=tweet]")[0].querySelectorAll("[data-testid=like]")[0] as HTMLElement | undefined
			if (likeButton) {
				likeButton.click()
			}
		}
	}

	return (
		<>
			<div style={{
				position: "absolute",
				top: boudingClientRect.y + scrollY,
				left: boudingClientRect.x + scrollX,
			}}
			>
				{tags.map(tag => (
					<DownloadButton key={tag} text={tag} callback={() => sendPayloadToBackground(tag)} mediaElement={mediaElement} />
				))}
			</div>
		</>)
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