# Backend of HFI Assignment

Heroku deployment: https://hfi-data-viewer.herokuapp.com/

## Technologies

- Node.js
- Express.js
- MongoDB

## Dependencies

- `npm install express` http server
- `npm install cors` to allow accesss from all origins
- `npm install mongoose` to use mongodb
- `npm install --save-dev nodemon` for easier debug
- `npm install bcrypt` for user login
- `npm install jsonwebtoken` for authentication
- `npm install dotenv` for environment variable

## How to Start

- run `npm start` in the project root dir
    - There is a `.env` file, which is used to store `PORT`, `MONGODB_URI`, etc.
- run `npm run dev` to run in dev mode, nodemon will monitor code change

## Deploy to Heroku

### Initial Steps
- create heroku app `heroku create hfi-data-viewer`
- set up heroku environment variable on the web site according to `.env`

### Iteration

- build ui from frontend `npm run build:ui`
- push current version to heroku `git push heroku master` or `npm run deploy`
