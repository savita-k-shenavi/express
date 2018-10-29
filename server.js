const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

// Configuring the database
const dbConfig = require('./config/mongodb.js');
const mongoose = require('mongoose');

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Require Notes routes
require('./app/routes/routes.js')(app);

mongoose.Promise = global.Promise;
// app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome 123."});
});

// define a simple route POST
app.post('/test', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

