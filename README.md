This project runs an Express server API with a React App front end client.

The client folder was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Enabling the Einstein API Manually
Set EINSTEIN_CLIENT_TOKEN to your manually created token or 'false' to use the response in the /temp directory.

***
EINSTEIN_CLIENT_TOKEN=false
***

# Enabling the Einstein API Programmatically

- Not yet available -

# Enabling calls to REI for local development

Calls to the REI website are default on NODE_ENV production and can be set manually using the .env file for heroku local developement.

***
REI_CALLS=true
***

# Available Scripts

In the root project directory, you can run:

### `npm run dev`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Open [http://localhost:5000/api/<endpoint>](http://localhost:5000/api/<endpoint>) to view the API endpoints in the browser.
Open [http://localhost:5000/temp/<file_name>](http://localhost:5000/api/<file_name>) to view the test data files in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run client-build`

Builds app files for running Heroku server locally.

### `heroku local`

Runs the app in the local Heroku mode.<br>
Requires building the app locally with `npm run client-build`<br>
Requires .env file at the root of the project with NODE_ENV set to LOCAL.
***
NODE_ENV='LOCAL'
***

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
Open [http://localhost:5000/api/<endpoint>](http://localhost:5000/api/<endpoint>) to view the API endpoints in the browser.
Open [http://localhost:5000/temp/<file_name>](http://localhost:5000/api/<file_name>) to view the test data files in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

