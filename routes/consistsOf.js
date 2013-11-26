var ConsistsOf = require('../model/ConsistsOf');

exports.addEventToTournament = function(req, res) {
	var consistsOf = new ConsistsOf({
		tournamentID:req.body.tournamentID,
		eventName:req.body.eventToAdd.eventName,
		division:req.body.eventToAdd.division,
		eventType:req.body.eventType.value,
	
		highScoreWins:parseInt(req.body.highScoreWins, 2),
		highTiebreakWins:parseInt(req.body.highTiebreakWins, 2),

		supervisorID:req.body.supervisorID,
		writerID:req.body.writerID
	});
	
	consistsOf.addEventToTournament(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(consistsOf.toJson());
		}
	});
};

exports.info = function(req, res) {
	var consistsOf = new ConsistsOf({
		tournamentID: req.query.tournamentID,
		eventName: req.query.name,
		division: req.query.division,
	});

	consistsOf.get(function(err) {
		if(err) {
			res.send(500);
		} else {
			res.json(consistsOf.toJson());
		}
	});
};

exports.statuses = function(req, res) {
	ConsistsOf.getStatuses(function(result) {
		if(result.err) {
			res.send(500);
		} else {
			res.json(result);
		}
	});
};

exports.save = function(req, res) {
	var consistsOf = new ConsistsOf(req.body);
	consistsOf.save(function(err) {
		if(err) {
			res.send(500);
		} else {
			res.send(200);
		}
	});
};
