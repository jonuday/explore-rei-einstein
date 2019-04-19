// The call to Eistein should return one of the event/travel type classes
const fetch = require('node-fetch');

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
        const apiUrl = ''; // need to set it up
        sentence = sentence || 'Placeholder: I want to help the world';

        if (apiUrl != '') {
            fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                res.send({ 
                    einstein: data,
                    sentence: sentence
                 });
            })
            .catch(err => {
                res.redirect('/error');
            })
        } else {
            // temporary response
            res.send({ 
                einstein: 'stewardship',
                sentence: sentence
            });
        }
    });
}
