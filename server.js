const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
require('./routes')(app);

app.get('/temp/adventures-stewardship', (req, res) => { 
    res.sendFile('temp/adventures-stewardship.html', { root: __dirname });
})
app.get('/temp/events-stewardship', (req, res) => {  
    res.sendFile('temp/events-stewardship.html', { root: '/' });
})
app.get('/temp/einstein-response', (req, res) => {  
    res.sendFile('temp/einstein-response.json', { root: '/' });
})    


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname = 'client/build/index.html'));
})

// Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});
