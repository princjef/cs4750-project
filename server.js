var express = require('express'),
	mysql = require('mysql');

var app = express();
var config = require('./config.json');
var connection = mysql.createConnection(config);

app.use(express.compress());
app.use(express.static(__dirname + '/app'));

app.listen(8080);
console.log('Listening on port 8080');