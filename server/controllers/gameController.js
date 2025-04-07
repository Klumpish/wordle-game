// import wordList from "../data/wordlist.json" assert { type: "json" }

export const getRandomWord = (req, res) => {
	// Controller logic here
}

export const submitGuess = (req, res) => {
	// Controller logic here
}

const getWords =
	"https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"
const fetchWordList = async function () {
	try {
		const respons = await fetch(getWords)
		if (respons.ok) {
			const data = await respons.text()
			const words = data.split("\n").map((word) => word.trim())
			return words
		} else {
			console.error("Error fetching wordList:", data.message)
		}
	} catch (error) {
		console.error("Network error fetching wordList:", error)
		return []
	}
}

export const startGame = async (req, res) => {
	try {
		const { wordLength, repeatingChar } = req.body
		const wordList = await fetchWordList()
		// Debugging
		console.log("Received settings:", { wordLength, repeatingChar })

		// filter word list
		const filteredWords = wordList.filter((word) => {
			const meetsLength = word.length === Number(wordLength) //ensure its a number
			const hasDuplicates = new Set(word).size !== word.length

			if (repeatingChar) {
				return meetsLength && hasDuplicates
			} else {
				return meetsLength && !hasDuplicates
			}
		})

		//#TODO  Debugging
		// console.log("filtered words:", filteredWords)

		if (filteredWords.length === 0) {
			return res.status(400).json({
				success: false,
				message: "no words matched the settings",
			})
		}

		// random word
		const randomIndex = Math.floor(Math.random() * filteredWords.length)
		const selectedWord = filteredWords[randomIndex]

		// #TODO Debugg
		console.log("selected word:", selectedWord)

		res.status(200).json({
			Success: true,
			message: "Game settings received",
			word: selectedWord.toUpperCase(),
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
