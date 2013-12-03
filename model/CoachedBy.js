var connection = require('../sql/connection');
var error = require('../sql/error');

var CoachedBy = function(obj) {
	this.tournamentID = obj.tournamentID;
	this.teamNumber = obj.teamNumber;
	this.division = obj.division;
	this.officialID = obj.officialID;
};

CoachedBy.prototype.create = function(callback) {
	connection.query('INSERT INTO CoachedBy(tournamentID, teamNumber, division, officialID) VALUES (?, ?, ?, ?)',
		[this.tournamentID, this.teamNumber, this.division, this.officialID], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO: Added a coach to a team');
			callback();
		}
	});
};

CoachedBy.prototype.remove = function(callback) {
	connection.query('DELETE FROM CoachedBy WHERE tournamentID=? AND teamNumber=? AND division=? AND officialID=?',
		[this.tournamentID, this.teamNumber, this.division, this.officialID], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO: Removed a coach from a team');
			callback();
		}
	});
};

CoachedBy.getCoachesByTournament = function(tournamentID, callback) {
	connection.query("SELECT * FROM CoachedBy WHERE tournamentID=?",
			[tournamentID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var entries = [];
			rows.forEach(function(row) {
				entries.push(new CoachedBy({
					tournamentID: row.tournamentID,
					teamNumber: row.teamNumber,
					division: row.division,
					officialID: row.officialID
				}));
			});
			callback(null, entries);
		}
	});
};


CoachedBy.prototype.toJson = function() {
	return {
		tournamentID:this.tournamentID,
		teamNumber:this.teamNumber,
		division:this.division,
		officialID:this.officialID
	};
};

module.exports = CoachedBy;