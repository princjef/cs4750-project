var Tournament = require('../model/Tournament');
var ParticipatesIn = require('../model/ParticipatesIn');

exports.info = function(req, res) {
	var tournament = new Tournament({
		id: req.params.id
	});

	tournament.getByID(function(err) {
		if(err && err.err) {
			res.send(500, err);
		} else if(err && err.response) {
			res.send(response.code, response.message);
		} else {
			res.json(tournament.toJson());
		}
	});
};

exports.participators = function(req, res) {
	ParticipatesIn.getParticipatingTeamsByEventAndTournament(req.params.tournamentID, req.params.eventName, req.params.division, function(err, entries) {
		if(err) {
			res.send(500, err);
		} else {
			var participators = [];
			
			entries.forEach(function(entry) {
				participators.push(entry.toParticipatorJson());
			});

			res.json({
				participators: participators,
				event: entries[0].event.toJson()
			});
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