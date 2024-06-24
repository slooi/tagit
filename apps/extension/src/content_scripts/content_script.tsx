import { createRoot } from 'react-dom/client';
import App from './App'
const body = document.querySelector('body')
const app = document.createElement('div')
app.id = 'react-root'

// Styles
app.style.position = "absolute"
app.style.top = "0px"
app.style.left = "0px"
app.style.zIndex = "10000000"

app.style.pointerEvents = "none"

if (!body) throw new Error("ERROR: body does not exist!")
body.prepend(app)

const container = document.getElementById('react-root');
const root = createRoot(container!);

root.render(<App />)  // Render react component
