import Highscore from "../models/Highscore.js"

// submit new highscore
export const submitHighscore = async (req, res) => {
	try {
		const { name, time, guesses, wordLength, repeatingChar } = req.body

		const newHighScore = new Highscore({
			name,
			time,
			guesses,
			wordLength,
			repeatingChar,
		})

		const savedHighscore = await newHighScore.save()

		res.status(201).json({
			success: true,
			data: savedHighscore,
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
export const getHighscores = async (req, res) => {
	try {
		const highscores = await Highscore.find().sort({ time: 1 })

		res.render("highscore", { highscores })
		// res.status(200).json({
		// 	success: true,
		// 	data: highscores,
		// })
	} catch (error) {
		console.error("Error getting highscores:", error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

export const getPaginatedHighscores = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1
		const pageSize = parseInt(req.query.pageSize) || 10

		const total = await Highscore.countDocuments()
		const highscores = await Highscore.find()
			.sort({ time: 1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize)

		res.status(200).json({
			success: true,
			data: highscores,
			totalPages: Math.ceil(total / pageSize),
		})
	} catch (error) {
		console.log("Error fetching paginated highscores:", error)
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		})
	}
}
