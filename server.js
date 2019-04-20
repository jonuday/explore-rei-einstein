const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
require('./routes')(app);

app.get('/temp-adventure', (req, res) => {  
    res.sendFile(path.join(__dirname, 'temp/adventures-stewardship.html'));
})
app.get('/temp-events', (req, res) => {  
    res.sendFile(path.join(__dirname, 'temp/events-stewardship.html'));
})
app.get('/temp-einstein', (req, res) => {  
    res.sendFile(path.join(__dirname, 'temp/einstein-response.json'));
})

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
})


// Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});
