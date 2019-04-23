// The call to REI should return the first page of a list of filtered results
const fetch = require('node-fetch');
const cors = require('cors');

module.exports = (app) => {
   let category;

   app.get('/api/adventures', cors(), (req, res) => {
        
        let category = req.query.category;
        let apiUrl = 'https://www.rei.com/adventures/a/'+category+'?r=a&origin=web'; 
        
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
