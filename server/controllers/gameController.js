import wordList from "../data/wordlist.json" assert { type: "json" }

export const getRandomWord = (req, res) => {
	// Controller logic here
}

export const submitGuess = (req, res) => {
	// Controller logic here
}

export const startGame = (req, res) => {
	try {
		const { wordLength, repeatingChar } = req.body

		// Debugging
		console.log("Received settings:", { wordLength, repeatingChar })

		// filter word list
		const filteredWords = wordList.filter((word) => {
			const meetsLength = word.length === Number(wordLength) //ensure its a number
			const hasDuplicates = new Set(word).size !== word.length
			// does it remove  duplicates like hello that have two L

			if (repeatingChar) {
				return meetsLength && hasDuplicates
			} else {
				return meetsLength && !hasDuplicates
			}
		})

		//Debugging
		console.log("filtered words:", filteredWords)

		if (filteredWords.length === 0) {
			return res.status(400).json({
				success: false,
				message: "no words matched the settings",
			})
		}

		// random word
		const randomIndex = Math.floor(Math.random() * filteredWords.length)
		const selectedWord = filteredWords[randomIndex]

		// Debugg
		console.log("selected word:", selectedWord)

		res.status(200).json({
			Success: true,
			message: "Game settings received",
			word: selectedWord,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
