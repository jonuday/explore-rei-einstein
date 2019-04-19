const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
require('./routes')(app);

app.get('/', (req, res) => {  
  res.send('no information available to render');
})
app.get('/temp-adventure', (req, res) => {  
    res.sendFile(path.join(__dirname + '/temp/adventures-stewardship.html'));
})
app.get('/temp-events', (req, res) => {  
    res.sendFile(path.join(__dirname + '/temp/events-stewardship.html'));
})

// //production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
// //build mode
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/public/index.html'));
// })

// Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});
