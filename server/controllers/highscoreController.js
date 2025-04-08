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

		return highscores
		// res.status(200).json({
		// 	success: true,
		// 	data: highscores,
		// })
	} catch (error) {
		console.error("Error getting highscores:", error)
		throw error
	}
}

export const getPaginatedHighscores = async (page, pageSize) => {
	try {
		const total = await Highscore.countDocuments()
		const highscores = await Highscore.find()
			.sort({ time: 1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize)

		return {
			data: highscores,
			totalPages: Math.ceil(total / pageSize),
		}
	} catch (error) {
		console.error("Error fetching paginated highscores:", error)
		throw new Error("Error fetching highscores")
	}
}
