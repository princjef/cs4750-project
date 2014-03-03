var connection = require('../sql/connection');
var Team = require('./Team');
var Event = require('./Event');
var ConsistsOf = require('./ConsistsOf');
var error = require('../sql/error');

var ParticipatesIn = function(obj) {
	this.team = obj.team; // this is a Team model object
	this.event = obj.event; // this is an Event model object
	this.scoreCode = obj.scoreCode;
	this.score = obj.score;
	this.tiebreak = obj.tiebreak;
	this.tier = obj.tier;
	this.place = obj.place;
};

ParticipatesIn.getRanksByDivisionAndTournament = function(tournamentID, division, callback) {
	connection.query("SELECT * FROM ParticipatesIn NATURAL JOIN Team NATURAL JOIN ConsistsOf WHERE tournamentID=? AND division=?",
			[tournamentID, division], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var entries = ParticipatesIn.populateMultiple(rows);
			callback(null, entries);
		}
	});

};

/*
 * Gets all teams participating in a certain event in a tournament
 * 
 * Params: tournamentID, eventName, eventDivision, callback function
 * 
 * Returns: error, array of participators
 */
ParticipatesIn.getParticipatingTeamsByEventAndTournament = function(tournamentID, eventName, eventDivision, callback) {
	connection.query("SELECT * FROM ParticipatesIn NATURAL JOIN Team NATURAL JOIN Event WHERE tournamentID=? AND eventName=? AND division=?",
			[tournamentID, eventName, eventDivision], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var entries = ParticipatesIn.populateMultiple(rows);
			callback(null, entries);
		}
	});
};

ParticipatesIn.getParticipatingTeamsByTournament = function(tournamentID, callback) {
	connection.query("SELECT * FROM ParticipatesIn NATURAL JOIN Team NATURAL JOIN Event WHERE tournamentID=? ORDER BY eventName",
			[tournamentID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var entries = ParticipatesIn.populateMultiple(rows);
			callback(null, entries);
		}
	});
};

ParticipatesIn.addByConsistsOf = function(consistsOf, callback) {
	connection.query("INSERT INTO ParticipatesIn (tournamentID, teamNumber, division, eventName, scoreCode, score, tiebreak, tier, place) " +
			"SELECT ?, Team.teamNumber, ?, ?, NULL, NULL, NULL, NULL, NULL FROM Team WHERE tournamentID=? AND division=?",
			[consistsOf.tournamentID, consistsOf.division, consistsOf.eventName, consistsOf.tournamentID, consistsOf.division], function(err) {
				if(err) {
					console.log(err);
					callback(error.message(err));
				} else {
					callback();
				}
			});
};

ParticipatesIn.populateMultiple = function(rows) {
	var result = [];
	var addParticipator = function(row) {
		result.push(new ParticipatesIn({
			team: new Team({
				tournamentID: row.tournamentID,
				number: row.teamNumber,
				division: row.division,
				name: row.teamName,
				state: row.state,
				school: row.school
			}),
			event: new Event({
				name: row.eventName,
				division: row.division
			}),
			scoreCode: row.scoreCode,
			score: row.score,
			tiebreak: row.tiebreak,
			tier: row.tier,
			place: row.place
		}));
	};

	rows.forEach(addParticipator);
	return result;
};

ParticipatesIn.getScoreCodes = function(callback) {
	connection.query("SHOW COLUMNS FROM ParticipatesIn LIKE 'scoreCode'", function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var match = rows[0].Type.match(/^enum\(\'(.*)\'\)$/)[1];
			callback(null, match.split('\',\''));
		}
	});
};

// ParticipatesIn.saveMultiple = function(array, callback) {
// 	var query = "UPDATE ParticipatesIn SET";
// 	var params = [];
// 	var queryParts = {
// 		scoreCode: {
// 			query: " scoreCode = CASE",
// 			end: " ELSE scoreCode END",
// 			params: []
// 		},
// 		score: {
// 			query: " score = CASE",
// 			end: " ELSE score END",
// 			params: []
// 		},
// 		tiebreak: {
// 			query: " tiebreak = CASE",
// 			end: " ELSE tiebreak END",
// 			params: []
// 		},
// 		tier: {
// 			query: " tier = CASE",
// 			end: " ELSE tier END",
// 			params: []
// 		},
// 		repeater: " WHEN (tournamentID=? AND teamNumber=? AND division=? AND eventName=?) THEN ?",
// 		inClause: {
// 			query: " WHERE (tournamentID, teamNumber, division, eventName) IN (",
// 			firstRepeater: "(?, ?, ?, ?)",
// 			repeater: ", (?, ?, ?, ?)",
// 			started: false,
// 			params: [],
// 			end: ")"
// 		}
// 	};

// 	array.forEach(function(participatesIn) {
// 		console.log("Iteration");
// 		queryParts.scoreCode.query += queryParts.repeater;
// 		queryParts.scoreCode.params = queryParts.scoreCode.params.concat([
// 			participatesIn.team.tournamentID,
// 			participatesIn.team.teamNumber,
// 			participatesIn.event.division,
// 			participatesIn.event.name,
// 			participatesIn.scoreCode
// 		]);

// 		queryParts.score.query += queryParts.repeater;
// 		queryParts.score.params = queryParts.score.params.concat([
// 			participatesIn.team.tournamentID,
// 			participatesIn.team.teamNumber,
// 			participatesIn.event.division,
// 			participatesIn.event.name,
// 			participatesIn.score
// 		]);

// 		queryParts.tiebreak.query += queryParts.repeater;
// 		queryParts.tiebreak.params = queryParts.tiebreak.params.concat([
// 			participatesIn.team.tournamentID,
// 			participatesIn.team.teamNumber,
// 			participatesIn.event.division,
// 			participatesIn.event.name,
// 			participatesIn.tiebreak
// 		]);

// 		queryParts.tier.query += queryParts.repeater;
// 		queryParts.tier.params = queryParts.tier.params.concat([
// 			participatesIn.team.tournamentID,
// 			participatesIn.team.teamNumber,
// 			participatesIn.event.division,
// 			participatesIn.event.name,
// 			participatesIn.tier
// 		]);

// 		queryParts.inClause.params = queryParts.inClause.params.concat([
// 			participatesIn.team.tournamentID,
// 			participatesIn.team.teamNumber,
// 			participatesIn.event.division,
// 			participatesIn.event.name
// 		]);

// 		if(queryParts.inClause.started) {
// 			queryParts.inClause.query += queryParts.inClause.repeater;
// 		} else {
// 			queryParts.inClause.query += queryParts.inClause.firstRepeater;
// 			queryParts.inClause.started = true;
// 		}
// 	});

// 	query += queryParts.scoreCode.query + queryParts.scoreCode.end + "," +
// 			queryParts.score.query + queryParts.score.end + "," +
// 			queryParts.tiebreak.query + queryParts.tiebreak.end + "," +
// 			queryParts.tier.query + queryParts.tier.end +
// 			queryParts.inClause.query + queryParts.inClause.end;

// 	params = params.concat(
// 		queryParts.scoreCode.params,
// 		queryParts.score.params,
// 		queryParts.tiebreak.params,
// 		queryParts.tier.params,
// 		queryParts.inClause.params
// 	);

// 	console.log(query);

// 	connection.query(query, params, function(err, result) {
// 		if(err) {
// 			console.log(err);
// 			callback(error.message(err));
// 		} else {
// 			console.log(result.affectedRows);
// 			callback();
// 		}
// 	});
// };

ParticipatesIn.prototype.save = function(callback) {
	var that = this;
	connection.query("UPDATE ParticipatesIn SET scoreCode=?, score=?, tiebreak=?, tier=?, place=? WHERE " +
			"tournamentID=? AND teamNumber=? AND division=? AND eventName=?",
			[this.scoreCode, this.score, this.tiebreak, this.tier, this.place, this.team.tournamentID, this.team.number, this.team.division, this.event.name], function(err, result) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			callback();
		}
	});
};

// Setters
ParticipatesIn.prototype.setTeam = function(team) {
	this.team = team;
};

ParticipatesIn.prototype.setEvent = function(event) {
	this.event = event;
};

ParticipatesIn.prototype.setScoreCode = function(scoreCode) {
	this.scoreCode = scoreCode;
};

ParticipatesIn.prototype.setScore = function(score) {
	this.score = score;
};

ParticipatesIn.prototype.setTiebreak = function(tiebreak) {
	this.tiebreak = tiebreak;
};

ParticipatesIn.prototype.setTier = function(tier) {
	this.tier = tier;
};

ParticipatesIn.prototype.toJson = function() {
	return {
		team: this.team.toJson(),
		event: this.event.toJson(),
		scoreCode: this.scoreCode,
		score: this.score,
		tiebreak: this.tiebreak,
		tier: this.tier,
		place: this.place
	};
};

ParticipatesIn.prototype.toParticipatorJson = function() {
	return {
		team: this.team.toJson(),
		scoreCode: this.scoreCode,
		score: this.score,
		tiebreak: this.tiebreak,
		tier: this.tier,
		place: this.place
	};
};

module.exports = ParticipatesIn;