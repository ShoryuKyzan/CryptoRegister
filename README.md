# Intro

* TODO make responsive, mobile first
* TODO say how to use it

# Features

* TODO Auto-refresh every 20 seconds.
* TODO ? Errors reported.
* TODO Touch-enabled sidebar (swipe open from left or use menu icon).
* TODO beware of rate limits

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