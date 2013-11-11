var connection = require('./../includes/connection');

exports.create = function(req, res) {
	connection.query("INSERT INTO Organization (orgName) VALUES (?)",
			[req.body.name], function(err, rows) {
		if(err) {
			console.log('ERR', err);
			res.send(500);
		} else {
			res.send(200, 'Organization successfully created');
		}
	});
};