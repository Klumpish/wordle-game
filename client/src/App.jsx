import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GamePage from "./pages/GamePage"
import AboutPage from "./pages/AboutPage"
import HighscoresPage from "./pages/HighscoresPage"
import Navigation from "./components/Navigation"

function App() {
	return (
		<>
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
						<Route
							path="/highscores"
							element={<HighscoresPage />}
						/>
					</Routes>
				</main>
			</Router>
		</>
	)
}

export default App
