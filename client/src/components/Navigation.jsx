import { NavLink } from "react-router-dom"
import "./Navigation.css"

import React from "react"

function Navigation() {
	return (
		<nav className="main-nav">
			<ul>
				<li>
					<NavLink
						to="/"
						end
						className={({ isActive }) => (isActive ? "active" : "")}>
						Game
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/about"
						className={({ isActive }) => (isActive ? "active" : "")}>
						About
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/highscores"
						className={({ isActive }) => (isActive ? "active" : "")}>
						High Score
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Navigation
