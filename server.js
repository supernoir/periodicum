'use strict'

// --- Setup
var express = require('express');
var app = express();
var nano = require('nano')('http://localhost:5984');


// --- DB Driver
var periodicum = nano.db.use('periodicum');

periodicum.list(function(err, body) {
  if (!err) {
    body.rows.forEach(function(doc) {
        
      console.log(doc);
    });
  }
});



// --- Listening
var port = 8787;
app.listen(port);
console.log("Server is running at port " + port);


