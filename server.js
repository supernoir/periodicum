'use strict'

// --- Setup
var express = require('express');
var app = express();
var nano = require('nano')('http://localhost:5984'),
    params = {include_docs: true}
    ;


// --- DB Driver
var periodicum = nano.db.use('periodicum');

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
var port = 8787;
app.listen(port);
console.log("Server is running at port " + port);


