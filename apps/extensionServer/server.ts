import express from "express"
import multer from "multer";

const mimeToExtensionDict = {
	'image/jpeg': '.jpg',
	'image/png': '.png',
	'image/gif': '.gif',
	'image/webp': '.webp',
	'image/svg+xml': '.svg',
	'application/pdf': '.pdf',
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
	console.log(req.headers)
	const message = "/ hit"
	console.log(message)
	res.send(message)
})

app.post("/save/attached-media", upload.array('file'), (req, res) => {
	if (!req.files) {
		return res.status(400).send('No file uploaded.');
	}

	console.log(req.params)
	console.log(req.query)
	console.log(req.body)
	console.log(req.files)
	res.send('File uploaded successfully!');
})
app.post("/save/external-media", (req, res) => {
	res.send("external-media")
})

app.listen(PORT, () => console.log("Listening on port " + PORT))