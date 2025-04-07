import express from "express"
import path from "path"
import cors from "cors"
import gameRoutes from "./routes/gameRoutes.js"
import highscoreRoutes from "./routes/highscoreRoutes.js"
import connectDB from "./db.js"

const app = express()
const PORT = 5080
const isProduction = process.env.NODE_ENV === "production"

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// show methods and urls
app.use((req, res, next) => {
	console.log(req.method, req.url)
	next()
})

// Enable CORS in development
if (!isProduction) {
	app.use(
		cors({
			origin: "http://localhost:5173", // Allow Vite dev server
		})
	)
}

// API routes
app.use("/api/game", gameRoutes)
app.use("/api/highscores", highscoreRoutes)

// In development, redirect to Vite server
if (!isProduction) {
	app.get("*", (req, res) => {
		res.redirect(`http://localhost:5173${req.url}`)
	})
}

// Only serve static files in production
if (isProduction) {
	const staticPath = path.join(process.cwd(), "server", "public")
	app.use(express.static(staticPath))
	app.get("*", (req, res) => {
		res.sendFile(path.join(staticPath, "index.html"))
	})
}
connectDB()

app.listen(PORT, () => {
	console.log(
		`Server running in ${isProduction ? "production" : "development"} mode on port http://localhost:${PORT}`
	)
	if (!isProduction) {
		console.log("Frontend dev server: http://localhost:5173")
	}
})
