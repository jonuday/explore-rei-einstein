// The call to Eistein should return one of the event/travel type classes
const fetch = require('node-fetch');
const FormData = require('form-data');

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
        location = location || '';
        
        const apiUrl = 'https://api.einstein.ai/v2/language/intent';
        const body = new FormData();
        body.append("Content-Type", "multipart/form-data");
        body.append("modelId", "32JI7GZFCNIYCOGM2ZNEFLJ25E");
        body.append("document", sentence);
        // @TODO: Get client token from Oauth. Currently can be set manually.
        const CLIENT_TOKEN = false;
        
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
                        sentence: sentence,
                        location: location,
                    });
                })
                .catch(err => {                    
                    res.redirect('/error');
                })
        } 
        else {           
            fetch('http://localhost:5000/temp-einstein')
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
