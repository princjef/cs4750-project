var connection = require('../sql/connection');

var Team = function(obj) {
	this.tournamentID = obj.tournamentID;
	this.number = obj.number;
	this.division = obj.division;
	this.name = obj.name;
	this.state = obj.state;
	this.school = obj.school;
};

// Static Functions

/*
 * Gets all teams at a certain tournament
 * 
 * Params: tournamentID, callback function
 * 
 * Returns: error, array of teams at the tournament
 */
Team.getByTournamentID = function(tournamentID, callback) {
	var teams = [];
	var addTeam = function(row) {
		teams.push(new Team({
			tournamentID: row.tournamentID,
			number: row.teamNumber,
			division: row.division,
			name: row.teamName,
			state: row.state,
			school: row.school
		}));
	};

	connection.query("SELECT * FROM Team WHERE tournamentID=?",
			[tournamentID], function(err, rows) {
		if(err) {
			console.log('ERR:', err);
			callback(err);
		} else {
			rows.forEach(addTeam);
			callback(null, teams);
		}
	});
};

Team.prototype.addToTournament = function(callback) {
	connection.query("INSERT INTO Team(tournamentID, teamNumber, division, teamName, state, school) VALUES(?, ?, ?, ?, ?, ?)",
		[this.tournamentID, this.number, this.division, this.name, this.state, this.school], function(err, row) {
			if(err) {
				console.log('ERR', err);
				callback(err);
			} else {
				console.log('INFO: Created a new team');
				callback();
			}
		});
};

// Setters
Team.prototype.setTournamentID = function(id) {
	this.tournamentID = id;
};

Team.prototype.setNumber = function(number) {
	this.number = number;
};

Team.prototype.setDivision = function(division) {
	this.division = division;
};

Team.prototype.setName = function(name) {
	this.name = name;
};

Team.prototype.setState = function(state) {
	this.state = state;
};

Team.prototype.setSchool = function(school) {
	this.school = school;
};

// To JSON
Team.prototype.toJson = function() {
	return {
		tournamentID: this.tournamentID,
		number: this.number,
		division: this.division,
		name: this.name,
		state: this.state,
		school: this.school
	};
};

module.exports = Team;