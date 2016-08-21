'use strict'

// --- Setup
var express = require('express');
var app = express();

// --- Postgres
// var pg = require('pg');

// pg.defaults.ssl = false;
// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/', express.static(__dirname + '/'));


// --- Listening
var port = process.env.PORT || 8787;
app.listen(port);
console.log("Server is running at port " + port);
