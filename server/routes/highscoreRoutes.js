import express from "express"
import {
	submitHighscore,
	getHighscores,
	getPaginatedHighscores,
} from "../controllers/highscoreController.js"

const router = express.Router()

router.post("/", submitHighscore)
// router.get("/highscores", getHighscores)
router.get("/", getHighscores)

// using this for the pagination of the highscore
router.get("/paginated", getPaginatedHighscores)

export default router
