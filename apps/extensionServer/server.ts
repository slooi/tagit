import express from "express"
import multer from "multer";

const mimeToExtensionDict = {
	'image/jpeg': '.jpg',
	'image/png': '.png',
	'image/gif': '.gif',
	'image/webp': '.webp',
	'image/svg+xml': '.svg',
	'application/pdf': '.pdf',
	'video/mp4': '.mp4'
	// Add more mappings as needed
}
function mimeToExtension(mimeType: keyof typeof mimeToExtensionDict) {
	const extension = mimeToExtensionDict[mimeType]

	// Check and return result
	if (extension === undefined) throw new Error("ERROR: trying to get extension from mime of: " + mimeType)
	return extension
}

const PORT = 8085

const app = express()

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} HIT!`)
	if (req.method === "POST") {
		console.log("req.body", req.body)
	}
	next()
})

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		console.log("filefilefilefile", file)
		console.log("filefilefilefile")
		cb(null, file.originalname.split(".")[0] + mimeToExtension(file.mimetype as keyof typeof mimeToExtensionDict)) // !@#!@#
	}
})

const upload = multer({ storage: storage }); // Set up uploads directory

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("/ hit")
})

app.post("/save/attached-media", upload.array('files'), (req, res) => {
	if (!req.files) {
		return res.status(400).send('No file uploaded.');
	}

	console.log("req.files")
	console.log(req.files)
	console.log("req.body ", req.body)
	res.send('File uploaded successfully!');
})
app.post("/save/external-media", (req, res) => {
	res.send("external-media")
})

app.listen(PORT, () => console.log("Listening on port " + PORT))