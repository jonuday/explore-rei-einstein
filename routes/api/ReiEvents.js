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

        let apiUrl = 'https://www.rei.com/events';
        if (location) {
            location_array = location.split(',');
            let city = location_array[0].trim().toLowerCase();
            let state = location_array[1].trim().toLowerCase();
            console.log(city.toLowerCase().trim(), state.toLowerCase().trim());
            apiUrl = apiUrl + '/p/us-' + state.replace(' ', '-') + '-' + city.replace(' ', '-');
        }

        apiUrl = apiUrl + '/a/' + category.toLowerCase().trim();
        console.log('Calling: ', apiUrl);

        fetch(apiUrl)
        .then(res => res.text())
        .then(data => {
            res.send({ events: data });
        })
        .catch(err => {
            res.send({ events: 'error' });
        })
    });
}
