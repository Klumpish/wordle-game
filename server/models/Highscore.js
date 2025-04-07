import mongoose from "mongoose"

const HighscoreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	time: {
		type: Number,
		required: true,
	},
	guesses: {
		type: Number,
		required: true,
	},
	wordLength: {
		type: Number,
		required: true,
	},
	repeatingChar: {
		type: Boolean,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.model("Highscore", HighscoreSchema)
