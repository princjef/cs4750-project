var express = require('express'),
	mysql = require('mysql');

var app = express();
var config = require('./config.json');
var connection = mysql.createConnection(config);

// Compression
app.use(express.compress());

// Static Server
app.use('/js', express.static(__dirname + '/app/js'));
app.use('/partials', express.static(__dirname + '/app/partials'));

// All other routes
app.all('/*', function(req, res) {
	console.log("GET", req.path);
	res.sendfile('./app/index.html');
});

app.listen(8080);
console.log('Listening on port 8080');