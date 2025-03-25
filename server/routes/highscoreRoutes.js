import express from "express"
import { getRandomWord, submitGuess } from "../controllers/gameController.js"

const router = express.Router()

router.get("/random-word", getRandomWord)
router.post("/submit-guess", submitGuess)

export default router
