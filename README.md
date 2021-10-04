# Intro

Crypto transaction records. Lists transactions made for items from particular vendors. Add/remove functionality.
Prices are recorded in terms of crypto and converted to a USD amount. Prices refreshed every 2 minutes.

* Mobile first! Entire design is responsive. Portrait mobile view shows up to a maximum of 480px width.
* Learned something new for this: CSS Grid responsive tables.
* Took some liberties with the user interface for usability's sake, and since this is designed to impress.
* TODO: fix mobile landscape view. Big numbers break it.

## TODOS
* make responsive, mobile first
* tutorial on use above.
* Auto-refresh every 20 seconds.
* ? Errors reported.
* beware of rate limits

# Features


# How to run

Set up a docker environment.

## Production

* This was designed to run on one machine inside a docker engine.
* run ./prod-build.sh, then ./prod-up.sh
* Will run frontend on port 80
* Will run backend on port 8000

## Development

### Frontend
* cd frontend/
* Run npm install
* Run npm start
* Navigate browser to localhost:3000 (it may open for you)
* Make changes to source files and the browser will auto-refresh.

### Backend
* cd backend/
* Run npm install -g nodemon
* Run npm install
* Run nodemon main.js
* Will run an API server on port 8000
* You can also just run ./dev-build.sh, ./dev-up.sh to start a backend in your docker engine (also running on port 8000, forwarded to your local 8000).

# Changelog

## TODO

* TODO