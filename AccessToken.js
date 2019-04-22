const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const LIFE = 7200;
let expiration = null;
let accessToken = null;

 async function getEinsteinToken() {
    if (!process.env.MANUAL_ACCESS_TOKEN || !process.env.EINSTEIN_VISION_PRIVATE_KEY) {

        const apiUrl = process.env.EINSTEIN_VISION_URL + 'v2/oauth2/token';

        const halfLife = (Date.now() / 1000) + LIFE / 2;
        if (
            expiration !== null &&
            expiration > halfLife &&
            accessToken !== null
        ) {
            return accessToken;
        }

        const payloadExpiration = (Date.now() / 1000) + LIFE;
        const payload = {
            sub: process.env.EINSTEIN_VISION_ACCOUNT_ID,
            aud: apiUrl,
            exp: payloadExpiration,
        };
        const token = jwt.sign(
            payload,
            process.env.EINSTEIN_VISION_PRIVATE_KEY,
            { algorithm: 'RS256'},
        );
        
        // Generate a refresh token
        async function generateRefreshToken(url,jwt_token){
            return await fetch(url, {
                body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt_token}&scope=offline`,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
            })
            .then(res => res.json())
            .then(data => {
                return data.refresh_token;
            });
        }

        // Generate an access token using the refresh token
        async function generateAccessToken(url, refresh_token) {
            return await fetch(url, {
                body: `grant_type=refresh_token&refresh_token=${refresh_token}&valid_for=60`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            })
            .then(res => res.json())
            .then(data => {
                console.log('access token:');
                console.log(data.access_token);

                return data.access_token;
            });
        }

        async function getToken(url, jwttoken){
            try {
                const refresh_token = await generateRefreshToken(apiUrl, jwttoken);
                const access_token = await generateAccessToken(apiUrl, refresh_token);
                return access_token;
            }
            catch(error){
                // Every error thrown in the whole “awaitable” chain will end up here now.
                console.log('getToken ERROR: ', error);
            }
        }

        expiration = payloadExpiration;


        console.log('No process.env.MANUAL_ACCESS_TOKEN set, generating oAuth token.');
        access_token = await getToken(apiUrl, token);
        return(access_token);

        console.log(access_token);
    
    } 
    else {
        
        let local_access_token = false;
        if (process.env.MANUAL_ACCESS_TOKEN) {
            console.log('MANUAL_ACCESS_TOKEN found in ".env"');
            local_access_token = process.env.MANUAL_ACCESS_TOKEN;
        } else {
            console.log('Either No MANUAL_ACCESS_TOKEN set in ".env" or running `npm run dev`.');
            console.log('Set MANUAL_ACCESS_TOKEN="your token" in ".env" and run `heroku local` to connect to Einstein API from local machine.');
            console.log('Temp Einstein API result (stewardship) used.');
        }
       
        return(local_access_token);
    }
};

module.exports = {
    update:getEinsteinToken
};