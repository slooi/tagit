import { createRoot } from 'react-dom/client';
import App from './App'
const body = document.querySelector('body')
const reactRoot = document.createElement('div')
reactRoot.id = 'content-script-root'

// Styles
reactRoot.style.position = "absolute"
reactRoot.style.top = "0px"
reactRoot.style.left = "0px"
reactRoot.style.zIndex = "10000000"
reactRoot.style.width = "100%"

// This allows you to click the image underneath the buttonContainer. Without this you can't click the img if the 
//buttonContainer is in the way
reactRoot.style.pointerEvents = "none"

if (!body) throw new Error("ERROR: body does not exist!")
body.prepend(reactRoot)

const container = document.getElementById(reactRoot.id);
const root = createRoot(container!);

root.render(<App />)  // Render react component
