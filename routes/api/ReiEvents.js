// The call to REI should return the first page of a list of filtered results
const fetch = require('node-fetch');

module.exports = (app) => {
    
    app.get('/events', (req, res) => {

        let category = req.query.category;
        
        const apiUrl = 'http://localhost:5000/temp-events'; 
        const temp = 'https://www.rei.com/events/a/' + category + '?previousLocation=San+Francisco%2C+CA%2C+USA&course.session.anyLocation=100.000000~38.232417~-122.636652;geo_r'
        if (apiUrl != '') {
            fetch(apiUrl)
            .then(res => res.text())
            .then(data => {
                res.send({ events: data });
            })
            .catch(err => {
                res.redirect('/error');
            })
        } else {
            // temporary response
            res.send({ events: [
                {id: 1, title: "Events Test Title"}
            ] });
        }
    });
}
