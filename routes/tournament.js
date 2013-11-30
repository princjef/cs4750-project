var Tournament = require('../model/Tournament');
var RunBy = require('../model/RunBy');
var permissions = require('../helper/permissions');

exports.info = function(req, res) {
	permissions.tournament(req, res, req.params.id, function() {
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
	permissions.organization(req, res, req.body.organizationID, function() {
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
	});
};

exports.update = function(req, res) {
	permissions.tournament(req, res, req.body.id, function() {
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
	});
};

exports.getByOrganizationID = function(req, res) {
	permissions.organization(req, res, req.params.organizationID, function() {
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
	});
};