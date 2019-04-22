// The call to REI should return the first page of a list of filtered results
const fetch = require('node-fetch');
const cors = require('cors');

module.exports = (app) => {
    
    app.get('/api/events',  cors(), (req, res) => {

        let category = req.query.category;
        let location = req.query.location;
        
        let apiUrl = 'http://localhost:5000/temp/events'; 
        if (process.env.NODE_ENV === 'production') {
            apiUrl = 'https://stark-sea-90144.herokuapp.com/temp/events';
        } 
        if (process.env.REI_CALLS === 'true') {           
            apiUrl = 'https://www.rei.com/events/a/' + category + '?previousLocation=' + encodeURIComponent(location) + '%2C+USA&course.session.anyLocation=100.000000~38.232417~-122.636652;geo_r'
            console.log('Calling rei.com/events');
        }
        if (apiUrl != '') {
            fetch(apiUrl)
            .then(res => res.text())
            .then(data => {
                res.send({ events: data });
            })
            .catch(err => {
                res.redirect('/error');
            })
        } 
        else {
            // temporary response
            res.send({ events: [
                {id: 1, title: "Events Test Title"}
            ] });
        }
    });
}
