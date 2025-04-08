import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GamePage from "./pages/GamePage"
import AboutPage from "./pages/AboutPage"
import HighscoresPage from "./pages/HighscoresPage"
import Navigation from "./components/Navigation"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./assets/theme"

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<Router>
					<Navigation />
					<main>
						<Routes>
							<Route
								path="/"
								element={<GamePage />}
							/>
							<Route
								path="/about"
								element={<AboutPage />}
							/>
						</Routes>
					</main>
				</Router>
			</ThemeProvider>
		</>
	)
}

export default App
