var Team = require('../model/Team');

exports.getByTournamentID = function(req, res) {
	Team.getByTournamentID(req.params.id, function(err, teams) {
		if(err) {
			res.send(500, err);
		} else {
			var result = [];
			teams.forEach(function(team) {
				result.push(team.toJson());
			});
			res.json(result);
		}
	});
};