var express = require('express'),
	mysql = require('mysql');

var app = express();
var config = require('./config.json');
var connection = mysql.createConnection(config);

// MIME Types
express.static.mime.define({'text/javascript': ['js']});

// Compression
app.use(express.compress());

// Parser
app.use(express.bodyParser());

// Static Server
app.use('/js', express.static(__dirname + '/app/js'));
app.use('/partials', express.static(__dirname + '/app/partials'));
app.use('/assets', express.static(__dirname + '/app/assets'));

app.get('/tournament/levels', function(req, res) {
	connection.query("SHOW COLUMNS FROM Tournament LIKE 'tournamentType'", function(err, rows) {
		if(err) {
			console.log('ERR', err);
			res.send(500);
		} else {
			var match = rows[0].Type.match(/^enum\(\'(.*)\'\)$/)[1];
			var levels = match.split('\',\'');
			res.json(levels);
		}
	});
});
app.post('/tournament/create', function(req, res) {
	console.log(req.body);
	connection.query("INSERT INTO Tournament (tournamentName, tournamentType, location, tournamentDate) VALUES (?, ?, ?, ?)",
		[req.body.name, req.body.type, req.body.location, req.body.date], function(err, rows) {
			if(err) {
				console.log('ERR', err);
				res.send(500);
			}
		});
});

// All other routes
app.all('/*', function(req, res) {
	console.log("GET", req.path);
	res.sendfile('./app/index.html');
});

app.listen(8080);
console.log('Listening on port 8080');