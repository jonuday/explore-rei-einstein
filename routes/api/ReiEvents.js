// The call to REI should return the first page of a list of filtered results
const fetch = require('node-fetch');
const cors = require('cors');

module.exports = (app) => {
    
    app.get('/api/events',  cors(), (req, res) => {

        let category = req.query.category;
        let location = req.query.location;
        
        // Examples of REI Events Pages
        // /events/p/us-or-portland?previousLocation=Portland,%20OR
        // /events/p/us-wa-seattle?previousLocation=Seattle,%20WA
        // /p/us-mi-detroit?previousLocation=Detroit,%20MI
        // /events/p/us-mi-detroit/a/outdoor-fitness

        console.log(location)
        location_array = location.split(',');
        city = location_array[0];
        state = location_array[1];

        let apiUrl = 'https://www.rei.com/events/p/us-' + state + '-' + city + '/a/' + category;
        console.log('Calling rei.com/events');

        fetch(apiUrl)
        .then(res => res.text())
        .then(data => {
            res.send({ events: data });
        })
        .catch(err => {
            res.redirect('/error');
        })
    });
}
