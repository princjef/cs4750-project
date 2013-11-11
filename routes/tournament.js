var connection = require('./../includes/connection');

exports.create = function(req, res) {
	connection.query("INSERT INTO Tournament (tournamentName, tournamentType, location, tournamentDate) VALUES (?, ?, ?, ?)",
			[req.body.name, req.body.type, req.body.location, req.body.date], function(err, rows) {
		if(err) {
			console.log('ERR', err);
			res.send(500);
		} else {
			res.send(200, 'Tournament successfully created');
		}
	});
};

exports.levels = function(req, res) {
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
};