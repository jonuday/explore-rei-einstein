const jwt = require('jsonwebtoken');
const request = require('request');
const oAuthToken = require('./oauth-token');
const url = process.env.EINSTEIN_VISION_URL
const private_key = process.env.EINSTEIN_VISION_PRIVATE_KEY
const account_id = process.env.EINSTEIN_VISION_ACCOUNT_ID

function updateToken(url, private_key, account_id) {

    const reqUrl = `${url}v2/oauth2/token`;

    // JWT payload
    const rsa_payload = {
        "sub":account_id,
        "aud":reqUrl
    }

    const rsa_options = {
        header:{
            "alg":"RS256",
            "typ":"JWT"
        },
        expiresIn: '1h'
    }

    // Sign the JWT payload
    // private_key = new Buffer(process.env.MY_PUBLIC_KEY, 'base64').toString('utf-8');
    var assertion = jwt.sign(rsa_payload, private_key, rsa_options);

    var options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json'
        },
        body:`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${encodeURIComponent(assertion)}`,
        method: `POST`
    }

    // Make the OAuth call to generate a token
    return fetch(reqUrl, options)
        .then(res => res.json())
        .then(data => {                
            oAuthToken.set(accessToken);
            return data.access_token;
        })
        .catch(err => {                
            res.send({message: err});
        })
}
module.exports = {
    update:updateToken,
}