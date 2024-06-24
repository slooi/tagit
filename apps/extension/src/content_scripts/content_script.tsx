import { createRoot } from 'react-dom/client';
import App from './App'
const body = document.querySelector('body')
const reactRoot = document.createElement('div')
reactRoot.id = 'react-root'

// Styles
reactRoot.style.position = "absolute"
reactRoot.style.top = "0px"
reactRoot.style.left = "0px"
reactRoot.style.zIndex = "10000000"

reactRoot.style.pointerEvents = "none"

if (!body) throw new Error("ERROR: body does not exist!")
body.prepend(reactRoot)

const container = document.getElementById('react-root');
const root = createRoot(container!);

root.render(<App />)  // Render react component
