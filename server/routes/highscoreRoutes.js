import express from "express"
import {
	submitHighscore,
	getHighscores,
} from "../controllers/highscoreController.js"

const router = express.Router()

router.post("/", submitHighscore)
router.get("/", getHighscores)

export default router
