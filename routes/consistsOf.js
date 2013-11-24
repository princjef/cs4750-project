var ConsistsOf = require('../model/ConsistsOf');

exports.addEventToTournament = function(req, res) {
	var consistsOf = new ConsistsOf({
		tournamentID:req.body.tournamentID,
		eventName:req.body.eventName,
		division:req.body.division,
		eventType:req.body.eventType,
	
		tiebreak:req.body.tiebreak,
		highScoreWins:req.body.highScoreWins,
		highTiebreakWins:req.body.highTiebreakWins,
		scored:req.body.scored,

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