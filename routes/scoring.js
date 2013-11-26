var ParticipatesIn = require('../model/ParticipatesIn');

exports.scoreCodes = function(req, res) {
	ParticipatesIn.getScoreCodes(function(result) {
		if(result.err) {
			res.send(500, result.err);
		} else {
			res.json(result);
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

exports.tiers = function(req, res) {
	ParticipatesIn.getTiers(function(result) {
		if(result.err) {
			res.send(500, result.err);
		} else {
			res.json(result);
		}
	});
};