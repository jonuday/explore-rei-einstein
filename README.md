This project runs an Express server API with a React App front end client.

The client folder was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Running locally for the first time

Install the packages for both the server and client.

`npm install && npm run client-install`

# Enabling the Einstein API Manually
Set EINSTEIN_CLIENT_TOKEN to your manually created token or 'false' to use the response in the /temp directory.
Generate token at [https://api.einstein.ai/token](https://api.einstein.ai/token)

***
MANUAL_ACCESS_TOKEN=token
EINSTEIN_VISION_ACCOUNT_ID='Account ID'
EINSTEIN_VISION_URL='https://api.einstein.ai/'
***

# Enabling calls to REI for local development

Calls to the REI website are enabled using the .env file for heroku local developement.

***
REI_CALLS=true
***

# Available Scripts

In the root project directory, you can run:

### `npm run client-build`

Builds app files for running Heroku server locally.

### `heroku local`

Runs the app in the local Heroku mode.<br>
Prerun steps:
1. Requires building the app locally with `npm run client-build`<br>
2. Requires .env file at the root of the project with NODE_ENV set to LOCAL.
***
NODE_ENV='LOCAL'
***

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
Open [http://localhost:5000/api/<endpoint>](http://localhost:5000/api/<endpoint>) to view the API endpoints in the browser.
Open [http://localhost:5000/temp/<file_name>](http://localhost:5000/api/<file_name>) to view the test data files in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

