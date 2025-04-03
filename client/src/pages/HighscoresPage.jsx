import React, { useEffect, useState } from "react"
import {
	Container,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Pagination,
} from "@mui/material"

function HighscorePage() {
	const [highscores, setHighscores] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const itemsPerPage = 10 //visar 10 scores per sida

	useEffect(() => {
		// Fetch highscores from backend
		const fetchHighscores = async () => {
			try {
				const response = await fetch(
					`/api/highscores/paginated?page=${currentPage}&pageSize=${itemsPerPage}`
				)

				const data = await response.json()
				if (response.ok) {
					setHighscores(data.data) // Update state with fetched highscores
					setTotalPages(data.totalPages) // update total pages
				} else {
					console.error("Error fetching highscores:", data.message)
				}
			} catch (error) {
				console.error("Network error fetching highscores:", error)
			}
		}

		fetchHighscores()
	}, [currentPage]) //when currentPage change this will fetch again

	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage

	return (
		<Container>
			<Typography
				variant="h4"
				sx={{ mt: 2 }}>
				Highscores
			</Typography>
			<Table sx={{ mt: 2 }}>
				<TableHead>
					<TableRow>
						<TableCell>Rank</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Time (s)</TableCell>
						<TableCell>Guesses</TableCell>
						<TableCell>Word Length</TableCell>
						<TableCell>Repeating Characters</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{highscores.map((highscore, index) => (
						// {highscores.slice(startIndex, endIndex).map((highscore, index) => (
						<TableRow key={index}>
							<TableCell>
								{(currentPage - 1) * itemsPerPage + index + 1}
							</TableCell>
							{/* <TableCell>{startIndex + index + 1}</TableCell> */}
							<TableCell>{highscore.name}</TableCell>
							<TableCell>{highscore.time}</TableCell>
							<TableCell>{highscore.guesses}</TableCell>
							<TableCell>{highscore.wordLength}</TableCell>
							<TableCell>{highscore.repeatingChar ? "Yes" : "No"}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination
				count={totalPages}
				page={currentPage}
				onChange={handlePageChange}
				sx={{ mt: 2 }}
			/>
		</Container>
	)
}

export default HighscorePage
