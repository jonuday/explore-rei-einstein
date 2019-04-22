// The call to REI should return the first page of a list of filtered results
const fetch = require('node-fetch');
const cors = require('cors');

module.exports = (app) => {
   let category;

   app.get('/api/adventures', cors(), (req, res) => {
        
        let category = req.query.category;
        let apiUrl = 'http://localhost:5000/temp/adventures';
        if (process.env.NODE_ENV === 'production') {
            apiUrl = 'https://stark-sea-90144.herokuapp.com/temp/adventures';
        } 
        else if (process.env.REI_CALLS === 'true') { 
            apiUrl = 'https://www.rei.com/adventures/a/'+category+'?r=a&origin=web'; 
            console.log('Calling rei.com/adventures');
        }
        
        fetch(apiUrl)
            .then(res => res.text())
            .then(data => {
                res.send({ 
                    adventures: data
                });
            })
            .catch(err => {
                res.redirect('/error');
            })

    });
}
