var Tournament = require('../model/Tournament');

exports.create = function(req, res) {
	var tournament = new Tournament({
		name: req.body.name,
		type: req.body.type,
		location: req.body.location,
		date: req.body.date
	});

	tournament.create(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(tournament.toJson());
		}
	});
};

exports.update = function(req, res) {
	var tournament = new Tournament({
		name: req.body.name,
		type: req.body.type,
		location: req.body.location,
		date: req.body.date
	});

	tournament.update(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(tournament.toJson());
		}
	});
};

exports.levels = function(req, res) {
	Tournament.getLevels(function(result) {
		if(result.err) {
			res.send(500, result.err);
		} else {
			res.json(result);
		}
	});
};