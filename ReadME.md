## Projektstruktur

    wordle-game/
    ├── client/ # React/Vite frontend
    │ ├── src/
    │ │ ├── components/ # React-komponenter
    │ │ ├── pages/ # Sidor (Game, About, Highscores)
    │ │ ├── App.jsx
    │ │ ├── main.jsx
    │ │ └── ...
    │ ├── public/
    │ ├── vite.config.js
    │ └── package.json
    ├── server/ # Express backend
    │ ├── routes/
    │ ├── controllers/
    │ ├── models/
    │ ├── data/ # Ordlistan från GitHub
    │ ├── app.js
    │ ├── server.js
    │ └── package.json
    ├── package.json # Root package.json (för att köra både client och server)
    └── README.md

## Sätt upp projektet

### Skapa React/Vite frontend

    npm create vite@latest client --template react
    cd client
    npm install react-router-dom axios
    cd ..

### Skapa Express backend

    mkdir server
    cd server
    npm init -y
    npm install express cors body-parser
    cd ..

### Skapa en package.json utan för client/server mapparna för att köra både client och server

    wordle-game/          (Root directory)
    ├── client/           (React/Vite frontend)
    ├── server/           (Express backend)
    └─> package.json      (This root package.json)

    {
    "name": "wordle-game",
    "version": "1.0.0",
    "scripts": {
        "start": "node server/server.js",
        "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
        "dev:server": "cd server && nodemon server.js",
        "dev:client": "cd client && npm run dev",
        "build": "cd client && npm run build",
        "test": "cd server && npm test && cd ../client && npm test"
    },
    "dependencies": {
        "concurrently": "^8.2.2"
    }
    }

### Installera concurrently och nodemon (för utveckling):

    @root package.json

    npm install concurrently --save-dev
    cd server
    npm install nodemon --save-dev
    cd ..

### Material UI - Install

    1. npm install @mui/material @emotion/react @emotion/styled

## Problems

- config of vite and express server. #FIXED
- had some problems with pagination on the highscore list #FIXED

## SSR of highscore list

- with SRR i can improve performance becouse i only fetch and render the necessary
  data for each page instead of loading all highscores at once.
- this will handle large datasets by slicing them on the server
- SEO optimization, Pre-rendered HTML improves search engine indexing.

## TODO

- add squares that shows the game field
- add a reset button while user is in mid game
- add a maximum amount of guesses..? yes? no? maybe??
- add the word list from github
