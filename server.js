'use strict'

// --- Setup
var express = require('express');
var app = express();
var nano = require('nano')('http://localhost:5984'),
    params = {include_docs: true}
    ;

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});


// --- DB Driver
var periodicum = nano.db.use('periodicum');


// ---
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(request, response) {

periodicum.list(params, function(err, body) {
    var docs = [];

    body.rows.forEach(function(doc) {
        docs.push(doc);
    });
       response.json(docs);
    });
});


// --- Listening
var port = process.env.PORT || 8787;
app.listen(port);
console.log("Server is running at port " + port);


