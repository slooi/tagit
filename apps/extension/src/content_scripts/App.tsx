import Button from "./Button"
import { useEffect, useState } from "react"

export default function App() {
	console.log("content_scripts.ts app ran")
	const [images, setImages] = useState([...document.querySelectorAll("img")])

	useEffect(() => {
		const interval = setInterval(() => setImages([...document.querySelectorAll("img")]), 333)
		return () => clearTimeout(interval)
	}, [])


	return (
		<>
			{
				images.map((image, i) => <Button key={i} />)
			}
		</>
	)
}