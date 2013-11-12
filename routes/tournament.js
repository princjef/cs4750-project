var tournamentSession = require('../sql/tournament');
var Tournament = require('../model/Tournament');

exports.create = function(req, res) {
	var tournament = new Tournament({
		name: req.body.name,
		type: req.body.type,
		location: req.body.location,
		date: req.body.date
	});

	tournamentSession.create(tournament, function(result) {
		if(result.err) {
			res.send(500, result.err);
		} else {
			res.send(200, 'Created Tournament with ID: ' + result);
		}
	});
};

exports.levels = function(req, res) {
	tournamentSession.getLevels(function(result) {
		if(result.err) {
			res.send(500, result.err);
		} else {
			res.json(result);
		}
	});
};