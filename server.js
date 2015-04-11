// ===========================================================================
// server.js
// @description: Setup server, register routes and swagger, start up express server.
// @authors: Steve Belovarich
// ===========================================================================

// packages
var express = require('express'); // call express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// app vars
var app = express(); // define our app using express
var port = process.env.PORT || 5555; // set our port

// =========================================================================
// MongoDB Config
// =========================================================================

mongoose.connect('mongodb://104.236.145.120:27017'); // connect to our database

// =========================================================================
// Express Config
// =========================================================================

// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Provide some basic error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

// =========================================================================
// App Modules
// =========================================================================

// Couple the application to the Swagger module.
// var swagger = require("swagger-node-express").createNew(app);
// swagger.addModels(require('./app/swagger/models'));
// require('./app/swagger/routes')(swagger);
// swagger.configure("http://localhost:5555/docs", "0.1");

// Couple the application to the router.
var routes = require('./router')(app,swagger);


// =========================================================================
// Server Start
// =========================================================================

app.listen(port);
console.log('Server on port ' + port);
module.exports = app;
