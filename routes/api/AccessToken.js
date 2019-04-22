const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

const LIFE = 7200;
let expiration = null;
let accessToken = null;

module.exports = (app) => {
    if (!process.env.EINSTEIN_CLIENT_TOKEN) {

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
            aud: `${process.env.EINSTEIN_VISION_URL}v2/oauth2/token`,
            exp: payloadExpiration,
            sub: process.env.EINSTEIN_VISION_ACCOUNT_ID,
        };
        const token = jwt.sign(
            payload,
            process.env.EINSTEIN_VISION_PRIVATE_KEY,
            { algorithm: 'RS256'},
        );
        const response = fetch(`${process.env.EINSTEIN_VISION_URL}v2/oauth2/token`, {
            body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const { access_token } = response.json();
        accessToken = access_token;
        expiration = payloadExpiration;
        console.log('No process.env.EINSTEIN_CLIENT_TOKEN set, generating oAuth token.');
        return accessToken;
    
    } 
    else {
        console.log('Manual process.env.EINSTEIN_CLIENT_TOKEN set in ".env", remove to generate oAuth token.');
        console.log('> ', process.env.EINSTEIN_CLIENT_TOKEN);
        return process.env.EINSTEIN_CLIENT_TOKEN;
    }
};