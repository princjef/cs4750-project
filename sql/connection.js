var mysql = require('mysql');
var config = require('./../config.json');

var connection;

var disconnected = function() {
	connection = mysql.createConnection(config);

	connection.connect(function(err) {
		if(err) {
			console.log("He's dead, Jim", err);
			setTimeout(disconnected, 2000);
		}
	});

	connection.on('error', function(err) {
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			disconnected();
		}
	});
};

setInterval(disconnected, 3600000);
disconnected();

module.exports = connection;