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

exports.addToTournament = function(req, res) {
	var team = new Team({
		tournamentID: req.params.id,
		number: req.body.teamNumber,
		division: req.body.division,
		name: req.body.teamName,
		state: req.body.state,
		school: req.body.school
	});
	team.addToTournament(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(team.toJson());
		}
	});
};

exports.update = function(req, res) {
	var team = new Team({
		tournamentID: req.params.id,
		number: req.body.number,
		division: req.body.division,
		name: req.body.name,
		state: req.body.state,
		school: req.body.school
	});
	team.update(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(team.toJson());
		}
	});
};

exports.remove = function(req, res) {
	var team = new Team({
		tournamentID: req.params.id,
		number: req.body.number,
		division: req.body.division,
		name: req.body.name,
		state: req.body.state,
		school: req.body.school
	});
	team.remove(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(team.toJson());
		}
	});
};