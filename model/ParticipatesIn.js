var connection = require('../sql/connection');
var Team = require('./Team');
var Event = require('./Event');
var error = require('../sql/error');

var ParticipatesIn = function(obj) {
	this.team = obj.team; // this is a Team model object
	this.event = obj.event; // this is an Event model object
	this.scoreCode = obj.scoreCode;
	this.score = obj.score;
	this.tiebreak = obj.tiebreak;
	this.tier = obj.tier;
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
			tier: row.tier
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

ParticipatesIn.getTiers = function(callback) {
	connection.query("SHOW COLUMNS FROM ParticipatesIn LIKE 'tier'", function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var match = rows[0].Type.match(/^enum\(\'(.*)\'\)$/)[1];
			var tiers = match.split('\',\'');
			for(var i = 0; i < tiers.length; i++) {
				tiers[i] = Number(tiers[i]);
			}
			callback(null, tiers);
		}
	});
};

ParticipatesIn.prototype.save = function(callback) {
	var that = this;
	connection.query("UPDATE ParticipatesIn SET scoreCode=?, score=?, tiebreak=?, tier=? WHERE " +
			"tournamentID=? AND teamNumber=? AND division=? AND eventName=?",
			[this.scoreCode, this.score, this.tiebreak, this.tier, this.team.tournamentID, this.team.number, this.team.division, this.event.name], function(err) {
		if(err) {
			console.log(err);
			callback(error.message(err));
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
		tier: this.tier
	};
};

ParticipatesIn.prototype.toParticipatorJson = function() {
	return {
		team: this.team.toJson(),
		scoreCode: this.scoreCode,
		score: this.score,
		tiebreak: this.tiebreak,
		tier: this.tier
	};
};

module.exports = ParticipatesIn;