import React from "react"
import {
	Container,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	CircularProgress,
} from "@mui/material"
// import { Trophy } from "@mui/icons-material"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"

function HighscoresPage() {
	// Sample data - replace with actual data from the server
	// const highscores = [
	// 	{ id: 1, name: "Player 1", score: 100, date: "2023-05-15" },
	// 	{ id: 2, name: "Player 2", score: 95, date: "2023-05-16" },
	// 	{ id: 3, name: "Player 3", score: 90, date: "2023-05-17" },
	// 	{ id: 4, name: "Player 4", score: 85, date: "2023-05-18" },
	// 	{ id: 5, name: "Player 5", score: 80, date: "2023-05-19" },
	// ]

	// For loading state example
	// const [loading, setLoading] = React.useState(false)

	return (
		<Container
			maxWidth="md"
			sx={{ mt: 4 }}>
			<Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
				<EmojiEventsIcon
					color="primary"
					sx={{ fontSize: 40, mr: 2 }}
				/>
				<Typography
					variant="h3"
					component="h1">
					Highscores
				</Typography>
			</Box>
		</Container>
	)
}

export default HighscoresPage
