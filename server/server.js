import express from "express"
import path from "path"
import cors from "cors"
import gameRoutes from "./routes/gameRoutes.js"
import highscoreRoutes from "./routes/highscoreRoutes.js"
import connectDB from "./db.js"
import { getPaginatedHighscores } from "./controllers/highscoreController.js"
import dotenv from "dotenv"
dotenv.config({ path: "./server/.env" })

const app = express()
const PORT = 5080
const isProduction = process.env.NODE_ENV === "production"

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// show methods and urls <--super useful
app.use((req, res, next) => {
	console.log(req.method, req.url)
	next()
})

app.set("view engine", "ejs")
const viewsPath = isProduction
	? path.join(process.cwd(), "server", "views")
	: path.join(process.cwd(), "views")
app.set("views", viewsPath)
console.log("Views path:", viewsPath)

// Enable CORS in development
if (!isProduction) {
	app.use(
		cors({
			origin: "http://localhost:5173", // Allow Vite dev server
			methods: ["GET", "POST"],
			credentials: true,
		})
	)
}

// API routes
app.use("/api/game", gameRoutes)
app.use("/api/highscores", highscoreRoutes)

app.get("/highscores", async (req, res) => {
	const currentPage = parseInt(req.query.page) || 1
	const itemsPerPage = 10

	try {
		// Get paginated highscores
		const response = await getPaginatedHighscores(currentPage, itemsPerPage)
		const highscores = response.data
		const totalPages = response.totalPages

		// Render the highscore page with data
		res.render("highscore", {
			highscores,
			currentPage,
			totalPages,
			itemsPerPage,
		})
	} catch (error) {
		console.error("Error fetching highscores:", error)
		res.status(500).send("Error fetching highscores")
	}
})

// In development, redirect to Vite server
if (!isProduction) {
	app.get("*", (req, res) => {
		res.redirect(`http://localhost:5173${req.url}`)
	})
}

// Only serve static files in production
if (isProduction) {
	const staticPath = path.join(process.cwd(), "client", "dist")
	app.use(express.static(staticPath))
	app.get("*", (req, res) => {
		res.sendFile(path.join(staticPath, "index.html"))
	})
}
connectDB()

app.listen(PORT, () => {
	console.log(
		`Server running in ${isProduction ? "production" : "🛠️🛠️development🛠️🛠️"} mode`
	)
	if (!isProduction) {
		console.log("dev server: http://localhost:5173")
	} else {
		console.log(`Server running on port http://localhost:${PORT}`)
	}
})
