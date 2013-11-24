var ConsistsOf = require('../model/ConsistsOf');

exports.addEventToTournament = function(req, res) {
	var consistsOf = new ConsistsOf({
		tournamentID:req.body.tournamentID,
		eventName:req.body.eventToAdd.eventName,
		division:req.body.eventToAdd.division,
		eventType:req.body.eventType.value,
	
		highScoreWins:parseInt(req.body.highScoreWins, 2),
		highTiebreakWins:parseInt(req.body.highTiebreakWins, 2),
		scored:parseInt(req.body.scored, 2),

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