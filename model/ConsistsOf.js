var connection = require('../sql/connection');
var error = require('../sql/error');

var ConsistsOf = function(obj) {
	this.tournamentID = obj.tournamentID;
	this.eventName = obj.eventName;
	this.division = obj.division;
	this.eventType = obj.eventType;
	
	this.highScoreWins = obj.highScoreWins;
	this.highTiebreakWins = obj.highTiebreakWins;
	this.status = obj.status;
	
	this.supervisorID = obj.supervisorID;
	this.writerID = obj.writerID;
};

ConsistsOf.prototype.get = function(callback) {
	var that = this;
	connection.query("SELECT * FROM ConsistsOf WHERE tournamentID=? AND eventName=? AND division=?",
			[this.tournamentID, this.eventName, this.division], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			that.eventType = rows[0].eventType;
			that.status = rows[0].status;
			that.highScoreWins = rows[0].highScoreWins;
			that.highTiebreakWins = rows[0].highTiebreakWins;
			that.writerID = rows[0].writer_officialID;
			that.supervisorID = rows[0].supervisor_officialID;
			callback();
		}
	});
};

ConsistsOf.prototype.addEventToTournament = function(callback) {
	connection.query('INSERT INTO ConsistsOf(tournamentID, eventName, division, eventType,'+
		' highScoreWins, highTiebreakWins, status, supervisor_officialID, writer_officialID)'+
		' VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [this.tournamentID, this.eventName, this.division, this.eventType,
		this.highScoreWins, this.highTiebreakWins, this.status, this.supervisorID, this.writerID],
		function(err, row) {
			if(err) {
				console.log(err);
				callback(error.message(err));
			} else {
				console.log('Added an event to a tournament');
				callback();
			}
		});
};

ConsistsOf.prototype.save = function(callback) {
	connection.query("UPDATE ConsistsOf SET eventType=?, highScoreWins=?, highTiebreakWins=?, status=?,"+
		" supervisor_officialID=?, writer_officialID=? WHERE tournamentID=? AND eventName=? AND division=?",
		[this.eventType, this.highScoreWins, this.highTiebreakWins, this.status, this.supervisorID, this.writerID,
		this.tournamentID, this.eventName, this.division], function(err, row) {
			if(err) {
				console.log(err);
				callback(error.message(err));
			} else {
				console.log('Updated an event in a tournament');
				callback();
			}
		});
};

ConsistsOf.prototype.remove = function(callback) {
	connection.query("DELETE FROM ConsistsOf WHERE tournamentID=? AND eventName=? AND division=?",
			[this.tournamentID, this.eventName, this.division], function(err, result) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else if(result.affectedRows === 0) {
			callback('The event specified does not exist');
		} else {
			callback();
		}
	});
};

ConsistsOf.getByTournamentID = function(tournamentID, callback) {
	connection.query("SELECT * FROM ConsistsOf WHERE tournamentID=?",
			[tournamentID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var entries = [];
			rows.forEach(function(row) {
				entries.push(new ConsistsOf({
					tournamentID: row.tournamentID,
					eventName: row.eventName,
					division: row.division,
					eventType: row.eventType,
					highScoreWins: row.highScoreWins,
					highTiebreakWins: row.highTiebreakWins,
					status: row.status,
					supervisorID: row.writer_officialID,
					writerID: row.supervisor_officialID
				}));
			});
			callback(null, entries);
		}
	});
};

ConsistsOf.getStatuses = function(callback) {
	connection.query("SHOW COLUMNS FROM ConsistsOf LIKE 'status'", function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var match = rows[0].Type.match(/^enum\(\'(.*)\'\)$/)[1];
			callback(match.split('\',\''));
		}
	});
};

ConsistsOf.prototype.toJson = function() {
	return {
		tournamentID:this.tournamentID,
		eventName:this.eventName,
		division:this.division,
		eventType:this.eventType,
	
		highScoreWins:this.highScoreWins,
		highTiebreakWins:this.highTiebreakWins,
		status:this.status,

		supervisorID:this.supervisorID,
		writerID:this.writerID
	};
};

ConsistsOf.prototype.setEventType = function(eventType) {
	this.eventType = eventType;
	return this;
};

ConsistsOf.prototype.setTiebreak = function(tiebreak) {
	this.tiebreak = tiebreak;
	return this;
};

ConsistsOf.prototype.setHighScoreWins = function(highScoreWins) {
	this.highScoreWins = highScoreWins;
	return this;
};

ConsistsOf.prototype.setHighTiebreakWins = function(highTiebreakWins) {
	this.highTiebreakWins = highTiebreakWins;
	return this;
};

ConsistsOf.prototype.setStatus = function(scored) {
	this.status = status;
	return this;
};

ConsistsOf.prototype.setSupervisorID = function(supervisorID) {
	this.supervisorID = supervisorID;
};

ConsistsOf.prototype.setOfficialID = function(officialID) {
	this.officialID = officialID;
	return this;
};

module.exports = ConsistsOf;