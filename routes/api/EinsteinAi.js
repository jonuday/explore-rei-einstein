// The call to Eistein should return one of the event/travel type classes
const fetch = require('node-fetch');
const FormData = require('form-data');
const cors = require('cors');
const accessToken = require('./AccessToken');

module.exports = (app) => {
    let sentence;
    let location;
    
    app.post('/api/ask_einstein',  cors(), (req, res) => {

        sentence = req.body.sentence;
        location = req.body.location;

		if(!sentence || !location) {
			res.redirect('/error');
		} else { 
			res.redirect('/results');
		}
    })
    
    app.get('/api/listen_to_einstein',  cors(), (req, res) => {
        
        sentence = sentence || 'I want to climb a mountain';
        location = location || '';
        
        let apiUrl = 'https://api.einstein.ai/v2/language/intent';
        const body = new FormData();
        body.append("Content-Type", "multipart/form-data");
        body.append("modelId", "32JI7GZFCNIYCOGM2ZNEFLJ25E");
        body.append("document", sentence);
        // @TODO: Get client token from Oauth. Currently can be set manually.

        let CLIENT_TOKEN = accessToken() || 'false';

        // console.log(process.env.EINSTEIN_CLIENT_TOKEN);
        // if (process.env.EINSTEIN_CLIENT_TOKEN) {
        //     CLIENT_TOKEN = process.env.EINSTEIN_CLIENT_TOKEN;
        // }
        
        if (CLIENT_TOKEN !== 'false') {
            console.log('Calling EinsteinAi');
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
                        sentence: sentence,
                        location: location,
                    });
                })
                .catch(err => {                    
                    res.redirect('/error');
                })
        } 
        else {
            console.log('CLIENT_TOKEN is false');
            apiUrl = 'http://localhost:5000/temp/einstein';

            if (process.env.NODE_ENV === 'production') {
                apiUrl = 'https://stark-sea-90144.herokuapp.com/temp/einstein';
            }
            fetch(apiUrl)
                .then(res => res.json())
                .then(data =>{                    
                    res.send({ 
                        einstein: data.probabilities[0]['label'],
                        sentence: sentence,
                        location: location,
                    });
                })
        }
    }); 

}
