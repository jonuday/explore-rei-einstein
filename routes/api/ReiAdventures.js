// The call to REI should return the first page of a list of filtered results
const fetch = require('node-fetch');

module.exports = (app) => {
   let category;

   app.get('/adventures', (req, res) => {
        
        let category = req.query.category;


        const apiUrl = 'http://localhost:5000/temp/adventures-stewardship'; 
        if (process.env) {
            apiUrl = 'https://www.rei.com/adventures/a/'+category+'?r=a&origin=web'; 
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
