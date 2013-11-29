var Tournament = require('../model/Tournament');
var RunBy = require('../model/RunBy');

exports.info = function(req, res) {
	var tournament = new Tournament({
		id: req.params.id
	});

	tournament.getByID(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(tournament.toJson());
		}
	});
};

exports.levels = function(req, res) {
	Tournament.getLevels(function(err, result) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(result);
		}
	});
};

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
			var runBy = new RunBy({
				orgID: req.body.organizationID,
				tournamentID: tournament.id
			});

			runBy.create(function(err) {
				if(err) {
					res.send(500, err);
				} else {
					res.json(tournament.toJson());
				}
			});
		}
	});
};

exports.update = function(req, res) {
	var tournament = new Tournament({
		name: req.body.name,
		type: req.body.type,
		location: req.body.location,
		date: req.body.date,
		id: req.body.id
	});

	tournament.update(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(tournament.toJson());
		}
	});
};

exports.getByOrganizationID = function(req, res) {
	Tournament.getByOrganizationID(req.params.organizationID, function(err, tournaments) {
		if(err) {
			res.send(500, err);
		} else {
			var result = [];
			tournaments.forEach(function(tournament) {
				result.push(tournament.toJson());
			});
			res.json(result);
		}
	});
};