import express from "express"
import { submitHighscore } from "../controllers/highscoreController.js"

const router = express.Router()

router.post("/", submitHighscore)

export default router
