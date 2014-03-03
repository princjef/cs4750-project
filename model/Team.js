var connection = require('../sql/connection');
var error = require('../sql/error');

var Team = function(obj) {
	this.tournamentID = obj.tournamentID;
	this.number = obj.number;
	this.division = obj.division;
	this.name = obj.name;
	this.state = obj.state;
	this.school = obj.school;
	this.scoreAdjustment = obj.scoreAdjustment;
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
			school: row.school,
			scoreAdjustment: row.scoreAdjustment
		}));
	};

	connection.query("SELECT * FROM Team WHERE tournamentID=?",
			[tournamentID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			rows.forEach(addTeam);
			callback(null, teams);
		}
	});
};

Team.prototype.update = function(callback) {
	connection.query("UPDATE Team SET teamName=?, state=?, school=? WHERE tournamentID=? AND teamNumber=? AND division=? AND scoreAdjustment=?",
	[this.name, this.state, this.school, this.tournamentID, this.number, this.division, this.scoreAdjustment], function(err, row) {
		if(err) {
			console.log('ERR', err);
			callback(error.message(err));
		} else {
			console.log('Updated team ' + this.number + ' from tournament ' + this.tournamentID + ' in division ' + this.division);
			callback();
		}
	});
};

Team.prototype.remove = function(callback) {
	connection.query("DELETE FROM Team WHERE (tournamentID=? AND teamNumber=? AND division=?)",
	[this.tournamentID, this.number, this.division], function(err, row) {
		if(err) {
			console.log('ERR', err);
			callback(error.message(err));
		} else {
			console.log('Deleted team ' + this.number + ' from tournament ' + this.tournamentID + ' in division ' + this.division);
			callback();
		}
	});
	
};

Team.prototype.addToTournament = function(callback) {
	connection.query("INSERT INTO Team(tournamentID, teamNumber, division, teamName, state, school, scoreAdjustment) VALUES(?, ?, ?, ?, ?, ?, ?)",
		[this.tournamentID, this.number, this.division, this.name, this.state, this.school, this.scoreAdjustment], function(err, row) {
			if(err) {
				console.log('ERR', err);
				callback(error.message(err));
			} else {
				console.log('INFO: Created a new team');
				callback();
			}
		});
};

Team.prototype.getCoaches = function(callback) {
	connection.query('SELECT name_first, name_last, officialID FROM Official NATURAL JOIN CoachedBy WHERE tournamentID=? AND division=? AND teamNumber=?',
		[this.tournamentID, this.division, this.number], function(err, rows) {
			if(err) {
				console.log('ERR', err);
				callback(error.message(err));
			} else {
				var result = [];
				console.log('INFO: Got coaches for team');
				rows.forEach(function(entry) {
					result.push({
						name_first:entry.name_first,
						name_last:entry.name_last,
						officialID:entry.officialID
					});
				});
				callback(null, result);
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
		school: this.school,
		scoreAdjustmnt: this.scoreAdjustment
	};
};

module.exports = Team;