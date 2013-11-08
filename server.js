var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendfile('./app/index.html');
});

app.get('/partials/:template', function(req, res) {
	res.sendfile('./app/partials/' + req.params.template + '.html');
});

app.listen(8080);
console.log('Listening on port 8080');
