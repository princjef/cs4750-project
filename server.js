var express = require('express');

var app = express();

// Route files
var organization = require('./routes/organization');
var tournament = require('./routes/tournament');

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

// Tournament Routes
app.get('/tournament/levels', tournament.levels);
app.post('/tournament/create', tournament.create);

// Organization Routes
app.post('/organization/create', organization.create);
app.post('/organization/update', organization.update);

// All other routes
app.all('/*', function(req, res) {
	console.log("GET", req.path);
	res.sendfile('./app/index.html');
});

app.listen(8080);
console.log('Listening on port 8080');