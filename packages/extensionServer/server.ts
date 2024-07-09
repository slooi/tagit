import express from "express"
import multer from "multer";
import path from "path";
import { promises as fsp } from "fs"

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

const upload = multer({ dest: 'uploads/_' });

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("/ hit")
})

app.post("/save/attached-media", upload.array('files'), async (req, res) => {
	console.log("req.files")
	console.log(req.files)
	console.log("req.body ", req.body)


	console.log("req.body.tags[0]", req.body.tags[0])
	const targetDir = path.resolve("uploads", req.body.tags[0])
	console.log('targetDir', targetDir)

	await ensureDirectoryExists(targetDir)

	if (Array.isArray(req.files)) {
		req.files.forEach(async (file: any) => {
			const oldPath = file.path;
			const newFilename = file.originalname.split(".")[0] + mimeToExtension(file.mimetype as keyof typeof mimeToExtensionDict);
			const newPath = path.join(targetDir, newFilename);

			await fsp.rename(oldPath, newPath)
		});
	}

	res.send('Files uploaded and moved successfully!');
})
app.post("/save/external-media", (req, res) => {
	res.send("external-media")
})

app.listen(PORT, () => console.log("Listening on port " + PORT))

async function ensureDirectoryExists(dirPath: string): Promise<void> {
	try {
		await fsp.access(dirPath);
	} catch (error) {
		await fsp.mkdir(dirPath, { recursive: true });
	}
}
