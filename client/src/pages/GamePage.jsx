import {
	Container,
	FormControl,
	Input,
	InputLabel,
	Select,
	MenuItem,
	Button,
	TextField,
	Typography,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import { useState } from "react"

function GamePage() {
	const [wordLength, setWordLength] = useState("")
	const [repeatingChar, setRepeatingChar] = useState("")
	const [targetWord, setTargetWord] = useState("") //hemliga ordet
	const [userGuess, setUserGuess] = useState("") //user input
	const [guesses, setGuesses] = useState([]) // feed back on guesses
	const [userName, setUserName] = useState("") // user name
	const [gameStarted, setGameStarted] = useState(false) //checks if game started
	const [gameEnded, setGameEnded] = useState(false) // checks if game ended
	const [startTime, setStartTime] = useState(null) // tack start time of game

	// const theme = useTheme()

	const handleChange = (event) => {
		setWordLength(event.target.value)
	}

	//
	const handleStartGame = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch("/api/game/start-game", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					wordLength: Number(wordLength) /* converts it to number */,
					repeatingChar: repeatingChar, //convert to boolean
				}),
			})

			const data = await response.json()

			if (response.ok) {
				setTargetWord(data.word) //spara ordet
				console.log("word:", data.word)
			} else {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
		} catch (error) {
			console.log("Error:", error)
		}
		setGuesses([])
		setGameStarted(true)
		setGameEnded(false)
		setUserName("")
		setStartTime(new Date().getTime())
	}

	// user guess
	const handleGuessSubmit = (e) => {
		e.preventDefault()
		if (userGuess.length !== targetWord.length) {
			//TODO use for right now...
			alert(`Gissningen måste vara ${targetWord.length} bokstäver långt.`)
			return
		}

		// feedback to user
		const feedback = genereateFeedback(userGuess, targetWord)

		// add current guess to the list of guesses
		setGuesses((prevGuesses) => [
			...prevGuesses,
			{ guess: userGuess, feedback },
		])

		setUserGuess("") //clear guess input

		if (userGuess === targetWord) {
			//TODO fix later
			setGameEnded(true) // Game ended
			alert("Grattis! Du gissade rätt ord!")
		}
	}

	const genereateFeedback = (guess, target) => {
		const result = []
		const targetLetterCount = {}

		// count of occurrence of each letter in the word
		for (const letter of target) {
			targetLetterCount[letter] = (targetLetterCount[letter] || 0) + 1
		}

		//TODO first pass: check for correct letters in the correct position GREEN
		for (let i = 0; i < guess.length; i++) {
			if (guess[i] === target[i]) {
				result[i] = "green" //correct
				targetLetterCount[guess[i]]--
			} else {
				result[i] = null //placeholder for later checks
			}
		}

		//TODO second pass check for misplaced letters YELLOW
		for (let i = 0; i < guess.length; i++) {
			if (result[i] === null && targetLetterCount[guess[i]] > 0) {
				result[i] = "yellow" //wrong positon right letter
				targetLetterCount[guess[i]]--
			} else if (result[i] === null) {
				result[i] = "red" // incorrect letter
			}
		}

		return result
	}

	// handle submitting highscore
	const handleSubmitHighscore = async (e) => {
		e.preventDefault()
		try {
			const endTime = new Date().getTime()
			const timeTaken = (endTime - startTime) / 1000 //calc time taken in seconds

			const numGuesses = guesses.length
			console.log(repeatingChar + "before sending to highscore")
			const response = await fetch("/api/highscores", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: userName,
					time: timeTaken,
					guesses: numGuesses,
					wordLength: targetWord.length,
					repeatingChar: repeatingChar,
				}),
			})

			const data = await response.json()
			if (response.ok) {
				console.log("Highscore submitted:", data)
				//TODO fix later
				alert("Tack för att du spelade!")
				setGameStarted(false)
				setGameEnded(false)
				setGuesses([])
				setUserName("")
			} else {
				console.error("Error submitting highscore:", data.message)
			}
		} catch (error) {
			console.error("Error submitting highscore:", error)
		}
	}

	return (
		<Container
			maxWidth="md"
			sx={{
				backgroundColor: "#e1bee7  ",
				display: "flex",
				mt: 2,
				flexDirection: "column",
				alignItems: "center",
			}}>
			{!gameStarted && (
				<>
					<Typography
						variant="h4"
						sx={{ mt: 2 }}>
						Välj inställningarna för ditt spel
					</Typography>
					<form
						onSubmit={handleStartGame}
						style={{
							display: "flex",
							flexDirection: "column",
							width: "45%",
						}}>
						<FormControl
							fullWidth
							required
							sx={{ maxWidth: 400, minWidth: 100, mb: 2 }}>
							<InputLabel id="wordLength">Antal Ord</InputLabel>
							<Select
								labelId="wordLength"
								id="wordLengthSelect"
								value={wordLength}
								label="antal bokstäver"
								onChange={handleChange}
								sx={{ height: 56 }}>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={7}>7</MenuItem>
							</Select>
						</FormControl>
						<FormControl
							fullWidth
							required
							sx={{ maxWidth: 400, minWidth: 100, mb: 2 }}>
							<InputLabel id="repeatingChars">
								Flera av samma bokstav
							</InputLabel>
							<Select
								labelId="repeatingChars"
								id="repeatingCharsSelect"
								value={String(repeatingChar)}
								label="Flera av samma bokstav"
								onChange={(event) =>
									setRepeatingChar(event.target.value === "true")
								}
								sx={{ height: 56 }}>
								<MenuItem value="true">Ja</MenuItem>
								<MenuItem value="false">Nej</MenuItem>
							</Select>
						</FormControl>
						<Button
							type="submit"
							variant="contained"
							size="large"
							sx={{ maxWidth: 400, minWidth: 100, mb: 2 }}>
							Start
						</Button>
					</form>
				</>
			)}
			{gameStarted && (
				<>
					<Typography
						variant="h4"
						sx={{ mt: 2 }}>
						Gissa ordet!
					</Typography>
					<form onSubmit={handleGuessSubmit}>
						<TextField
							value={userGuess}
							onChange={(e) => setUserGuess(e.target.value.toUpperCase())} //make guess uppercase
							label="Gissa ordet"
							variant="outlined"
							sx={{ mt: 2, mb: 2 }}
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 3, ml: 1 }}>
							Gissa!
						</Button>
					</form>
				</>
			)}

			{/* display all guesses */}
			{guesses.length > 0 && (
				<div style={{ marginTop: "20px" }}>
					{guesses.map((entry, rowIndex) => (
						<div
							key={rowIndex}
							style={{ display: "flex", marginBottom: "10px" }}>
							{entry.guess.split("").map((letter, index) => (
								<div
									key={index}
									style={{
										backgroundColor: entry.feedback[index],
										color: "black",
										fontWeight: "bold",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										width: "30px",
										height: "30px",
										marginRight: "5px",
									}}>
									{letter}
								</div>
							))}
						</div>
					))}
				</div>
			)}
			{/* highscore submission form */}
			{gameEnded && (
				<form onSubmit={handleSubmitHighscore}>
					<TextField
						value={userName}
						autoFocus={true}
						onChange={(e) => setUserName(e.target.value)}
						label="Ditt namn"
						variant="outlined"
						sx={{ mt: 2 }}
					/>
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: 3, ml: 1 }}>
						Skicka in highscore
					</Button>
				</form>
			)}
		</Container>
	)
}

export default GamePage
