var ConsistsOf = require('../model/ConsistsOf');
var ParticipatesIn = require('../model/ParticipatesIn');
var permissions = require('../helper/permissions');

exports.addEventToTournament = function(req, res) {
	permissions.tournament(req, res, req.body.tournamentID, function() {
		var consistsOf = new ConsistsOf({
			tournamentID:req.body.tournamentID,
			eventName:req.body.eventToAdd.eventName,
			division:req.body.eventToAdd.division,
			eventType:req.body.eventType.value,

			status: 'Not Started',
			highScoreWins:parseInt(req.body.highScoreWins, 2),
			highTiebreakWins:parseInt(req.body.highTiebreakWins, 2),

			supervisorID:req.body.supervisorID,
			writerID:req.body.writerID
		});
		
		consistsOf.addEventToTournament(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				ParticipatesIn.addByConsistsOf(consistsOf, function(err) {
					if(err) {
						res.send(500, err);
					} else {
						res.json(consistsOf.toJson());
					}
				});
			}
		});
	});
};

exports.info = function(req, res) {
	permissions.tournament(req, res, req.query.tournamentID, function() {
		var consistsOf = new ConsistsOf({
			tournamentID: req.query.tournamentID,
			eventName: req.query.name,
			division: req.query.division,
		});

		consistsOf.get(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				res.json(consistsOf.toJson());
			}
		});
	});
};

exports.statuses = function(req, res) {
	ConsistsOf.getStatuses(function(result) {
		if(result.err) {
			res.send(500, err);
		} else {
			res.json(result);
		}
	});
};

exports.save = function(req, res) {
	permissions.tournament(req, res, req.body.tournamentID, function() {
		var consistsOf = new ConsistsOf(req.body);
		consistsOf.save(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				res.send(200);
			}
		});
	});
};

exports.getByTournament = function(req, res) {
	permissions.tournament(req, res, req.params.id, function() {
		ConsistsOf.getByTournamentID(req.params.id, function(err, entries) {
			if(err) {
				res.send(500, err);
			} else {
				var result = [];
				entries.forEach(function(entry) {
					result.push(entry.toJson());
				});
				res.json(result);
			}
		});
	});
};

exports.remove = function(req, res) {
	permissions.tournament(req, res, req.body.tournamentID, function() {
		var consistsOf = new ConsistsOf(req.body);
		consistsOf.remove(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				res.json(consistsOf);
			}
		});
	});
};