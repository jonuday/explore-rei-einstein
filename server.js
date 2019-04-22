const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// require('./routes')(app);
require('./routes/api/EinsteinAi')(app);
require('./routes/api/ReiAdventures')(app);
require('./routes/api/ReiEvents')(app);

// @TODO: Remove when authentication is wired up.
// Temporary data routes.
app.get('/temp/adventures', cors(), (req, res) => {  
    res.sendFile(path.join(__dirname + '/temp/adventures-stewardship.html'));
})
app.get('/temp/events', cors(), (req, res) => {  
    res.sendFile(path.join(__dirname + '/temp/events-stewardship.html'));
})
app.get('/temp/einstein', cors(), (req, res) => {  
    res.sendFile(path.join(__dirname + '/temp/einstein-response.json'));
})

// React static file declarations.
// Production and Heroku Local.
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'LOCAL') {
  // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Anything that doesn't match the above, send back index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
} 

// Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});
