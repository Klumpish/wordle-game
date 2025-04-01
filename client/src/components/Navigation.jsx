import { NavLink } from "react-router-dom"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import MenuIcon from "@mui/icons-material/Menu"
import InfoOutlineIcon from "@mui/icons-material/InfoOutline"
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags"
import {
	AppBar,
	Toolbar,
	List,
	ListItem,
	styled,
	Typography,
	useTheme,
	useMediaQuery,
	Box,
	IconButton,
	Drawer,
} from "@mui/material"
import "./Navigation.css"
import React, { useState } from "react"

const StyledNavLink = styled(NavLink)(({ theme }) => ({
	color: theme.palette.common.white,
	textDecoration: "none",
	padding: theme.spacing(1, 2),
	borderRadius: theme.shape.borderRadius,
	"&.active": {
		backgroundColor: theme.palette.primary.dark,
		fontWeight: "bold",
	},
	"&:hover": {
		backgroundColor: theme.palette.primary.light,
	},
}))

function Navigation() {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
	const [mobileOpen, setMobileOpen] = useState(false)

	const handleMenuToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	// navigation items
	const navItems = [
		{ text: "Game", to: "/", end: true, icon: <SportsEsportsIcon /> },
		{ text: "About", to: "/about", icon: <InfoOutlineIcon /> },
		{ text: "High Score", to: "/highscores", icon: <EmojiFlagsIcon /> },
	]

	// Menu component for mobile
	const menuItems = (
		<Box
			onClick={handleMenuToggle}
			sx={{ textAlign: "center", width: 250 }}>
			<Typography
				variant="h6"
				sx={{ my: 2 }}>
				Menu
			</Typography>
			<List>
				{navItems.map((item) => (
					<ListItem
						key={item.text}
						disablePadding>
						<StyledNavLink
							to={item.to}
							end={item.end}
							className={({ isActive }) => (isActive ? "active" : "")}
							sx={{ width: "100%", textAlign: "center" }}>
							{item.icon}
							{item.text}
						</StyledNavLink>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1 }}>
					Wordle Game, Material ui editon!
				</Typography>

				{isMobile && (
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleMenuToggle}
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
				)}
				{!isMobile && (
					<List
						component="nav"
						sx={{ display: "flex" }}>
						{navItems.map((item) => (
							<ListItem
								key={item.text}
								disablePadding>
								<StyledNavLink
									to={item.to}
									end={item.end}
									className={({ isActive }) => (isActive ? "active" : "")}>
									{item.icon}
									{item.text}
								</StyledNavLink>
							</ListItem>
						))}
					</List>
				)}
				<Drawer
					anchor="right"
					open={mobileOpen}
					onClose={handleMenuToggle}
					ModalProps={{ keepMounted: true }}
					PaperProps={{
						sx: {
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.common.white,
						},
					}}>
					{menuItems}
				</Drawer>
			</Toolbar>
		</AppBar>
		/* 
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
		</nav> */
	)
}

export default Navigation
