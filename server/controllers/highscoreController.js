import fs from "fs"
import path from "path"

const highscoreFilePath = path.join(process.cwd(), "data", "highscores.json")

// read highscore from fiel

const readHighscores = () => {
	try {
		const data = fs.readFileSync(highscoreFilePath, "utf-8")
		return JSON.parse(data)
	} catch (error) {
		console.error("Error reading highscores file:", error)
		return []
	}
}

// write highscore to file
const writeHighscores = (highscores) => {
	try {
		fs.writeFileSync(highscoreFilePath, JSON.stringify(highscores, null, 2))
	} catch (error) {
		console.error("Error writing to highscores file:", error)
	}
}

// submit new highscore
export const submitHighscore = (req, res) => {
	try {
		const { name, time, guesses, wordLength, repeatingChar } = req.body

		//TODO add lgic to save highscore to database
		const newHighScore = { name, time, guesses, wordLength, repeatingChar }
		const highscores = readHighscores()

		// add new highscore and sort by time
		highscores.push(newHighScore)
		highscores.sort((a, b) => a.time - b.time)

		// save updated highscores to file
		writeHighscores(highscores)

		res.status(200).json({
			success: true,
			message: "Highscore submitted successfully",
			data: newHighScore,
		})
	} catch (error) {
		console.error("Error submitting highscore:", error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

// get all highscores
export const getHighscores = (req, res) => {
	try {
		const highscores = readHighscores()
		res.status(200).json({
			success: true,
			data: highscores,
		})
	} catch (error) {
		console.error("Error getting highscores:", error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const getPaginatedHighscores = (req, res) => {
	try {
		// extract page and pageSize
		const { page = 1, pageSize = 10 } = req.query
		const highscores = readHighscores()

		const startIndex = (page - 1) * pageSize
		const endIndex = startIndex + Number(pageSize)

		// slice data for pagination
		const paginatedData = highscores.slice(startIndex, endIndex)
		const totalPages = Math.ceil(highscores.length / pageSize)

		res.status(200).json({
			success: true,
			data: paginatedData,
			totalPages,
		})
	} catch (error) {
		console.log("Error fetching paginated highscores:", error)
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		})
	}
}
