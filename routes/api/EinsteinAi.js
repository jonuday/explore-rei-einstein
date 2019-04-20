// The call to Eistein should return one of the event/travel type classes
const fetch = require('node-fetch');
const FormData = require('form-data');
const auth = require('../../auth');
const oAuthToken = require('../../oauth-token');

const EINSTEIN_VISION_URL = process.env.EINSTEIN_VISION_URL;
const EINSTEIN_VISION_ACCOUNT_ID  = process.env.EINSTEIN_VISION_ACCOUNT_ID;
const EINSTEIN_VISION_PRIVATE_KEY = process.env.EINSTEIN_VISION_PRIVATE_KEY;

module.exports = (app) => {
    let sentence;
    let location;
    
    app.post('/ask_einstein', (req, res) => {

        sentence = req.body.sentence;
        location = req.body.location;

		if(!sentence || !location) {
			res.redirect('/error');
		} else { 
			res.redirect('/results');
		}
    })
    
    app.get('/listen_to_einstein', (req, res) => {
        
        sentence = sentence || 'I want to climb a mountain';
        const apiUrl = 'https://api.einstein.ai/v2/language/intent';
        const body = new FormData();
        body.append("Content-Type", "multipart/form-data");
        body.append("modelId", "32JI7GZFCNIYCOGM2ZNEFLJ25E");
        body.append("document", sentence);
        // @TODO: Get client token from Oauth.
        let token = oAuthToken.get();
        if (!token) {            
            auth.update(EINSTEIN_VISION_URL, EINSTEIN_VISION_PRIVATE_KEY, EINSTEIN_VISION_ACCOUNT_ID);
            token = oAuthToken.get();
        }
        
        const CLIENT_TOKEN =  token || false;
        console.log('EAI: ',CLIENT_TOKEN);

        if (CLIENT_TOKEN !== false ) {
            fetch(apiUrl, {
                body,
                headers: {
                    Authorization: "Bearer " + CLIENT_TOKEN,
                    "Cache-Control": "no-cache"                    
                },
                method: "POST"
            })
                .then(res => res.json())
                .then(data => {
                    // @TODO: Add items with probability higher than 90%                    
                    res.send({ 
                        einstein: data.probabilities[0]['label'], 
                        sentence: sentence
                    });
                })
                .catch(err => {                    
                    // res.redirect('/error');
                    res.send({message: err});
                })
        } 
        else {           
            fetch('http://localhost:5000/temp-einstein')
                .then(res => res.json())
                .then(data =>{                    
                    res.send({ 
                        einstein: data.probabilities[0]['label'],
                        sentence: sentence
                    });
                })
        }
    }); 

}
