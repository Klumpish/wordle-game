import express from "express"
import {
	getRandomWord,
	submitGuess,
	startGame,
} from "../controllers/gameController.js"

const router = express.Router()

router.get("/random-word", getRandomWord)
router.post("/submit-guess", submitGuess)
router.post("/start-game", startGame)

export default router
