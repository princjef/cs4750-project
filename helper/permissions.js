var connection = require('../sql/connection');
var error = require('../sql/error');

exports.user = function(req, res, username, callback) {
	if(!req.user || !req.username || req.user.username !== username) {
		res.send(401);
	} else {
		callback();
	}
};

exports.organization = function(req, res, orgID, callback) {
	if(!req.user || !req.user.username) {
		res.send(401);
	} else {
		connection.query("SELECT * FROM BelongsTo WHERE username=? AND orgID=? LIMIT 1",
				[req.user.username, orgID], function(err, rows) {
			if(err) {
				res.send(500, error.message(err));
			} else if(rows.length === 0) {
				res.send(401);
			} else {
				callback();
			}
		});
	}
};

exports.tournament = function(req, res, orgID, callback) {
	if(!req.user || !req.user.username) {
		res.send(401);
	} else {
		connection.query("SELECT * FROM BelongsTo NATURAL JOIN RunBy WHERE username=? tournamentID=?",
				[req.user.username, tournamentID], function(err, rows) {
			if(err) {
				res.send(500, error.message(err));
			} else if(rows.length === 0) {
				res.send(401);
			} else {
				callback();
			}
		});
	}
};