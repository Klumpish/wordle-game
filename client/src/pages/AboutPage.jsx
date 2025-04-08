import React from "react"
import { Container, Typography, Box } from "@mui/material"

function AboutPage() {
	return (
		<Container
			maxWidth="md"
			sx={{ mb: 5 }}>
			<Box mt={4}>
				<Typography
					variant="h3"
					gutterBottom
					textAlign={"center"}
					sx={{ color: "black" }}>
					About the Project
				</Typography>
				<Typography
					variant="body1"
					paragraph
					sx={{ color: "black", fontSize: "1.5rem" }}>
					This project is a Wordle-inspired web application built using modern
					web technologies including React, Vite, Material-UI, Express.js, and
					MongoDB
				</Typography>
				<Typography
					variant="body1"
					paragraph
					sx={{ color: "black", fontSize: "1.5rem" }}>
					The frontend is build with React and styled with Material-UI,
					providing a clean and user-friendly interface.
				</Typography>
				<Typography
					variant="body1"
					paragraph
					sx={{ color: "black", fontSize: "1.5rem" }}>
					While the backend is build with Express and Node.js, using MongoDB to
					store the High scores.
				</Typography>
				<Typography
					variant="body1"
					paragraph
					sx={{ color: "black", fontSize: "1.5rem" }}>
					The goal of this project is to provide a fun and interactive word
					guessing game while demonstrating full-stack development skills. The
					application includes:
					<ul>
						<li>
							A responsive frontend built with React and styled using
							Material-UI
						</li>
						<li>A backend API powered by Express.js</li>
						<li>Highscore tracking stored in MongoDB Atlas</li>
						<li>Server-side pagination for efficient data handling</li>
					</ul>
				</Typography>
				<Typography
					variant="body1"
					paragraph
					sx={{ color: "black", fontSize: "1.5rem" }}>
					This project was created to help me learn React, Material-UI,
					databases like MongoDB. How to work with both front and backend
					together.
				</Typography>
			</Box>
		</Container>
	)
}

export default AboutPage
