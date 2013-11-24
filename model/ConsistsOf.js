var connection = require('../sql/connection');

var ConsistsOf = function(obj) {
	this.tournamentID = obj.tournamentID;
	this.eventName = obj.eventName;
	this.division = obj.division;
	this.eventType = obj.eventType;
	
	this.highScoreWins = obj.highScoreWins;
	this.highTiebreakWins = obj.highTiebreakWins;
	this.scored = obj.scored;
	
	this.supervisorID = obj.supervisorID;
	this.writerID = obj.writerID;
};

ConsistsOf.prototype.addEventToTournament = function(callback) {
	connection.query('INSERT INTO ConsistsOf(tournamentID, eventName, division, eventType,'+
		' highScoreWins, highTiebreakWins, scored, supervisor_officialID, writer_officialID)'+
		' VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [this.tournamentID, this.eventName, this.division, this.eventType,
		this.highScoreWins, this.highTiebreakWins, this.scored, this.supervisorID, this.writerID],
		function(err, row) {
			if(err) {
				console.log(err);
				callback(err);
			} else {
				console.log('Added an event to a tournament');
				callback();
			}
		});
};

ConsistsOf.prototype.updateEventInTournament = function(callback) {
	connection.query('UPDATE ConsistsOf SET tournamentID=?, eventName=?, division=?, eventType=?,'+
		' highScoreWins=?, highTiebreakWins=?, scored=?, supervisor_officialID=?, writer_officialID=?)',
		[this.tournamentID, this.eventName, this.division, this.eventType, this.highScoreWins, 
		this.highTiebreakWins, this.scored, this.supervisorID, this.writerID], function(err, row) {
			if(err) {
				console.log(err);
				callback(err);
			} else {
				console.log('Updated an event in a tournament');
				callback();
			}
		});
};

ConsistsOf.prototype.toJson = function() {
	return {
		tournamentID:this.tournamentID,
		eventName:this.eventName,
		division:this.division,
		eventType:this.eventType,
	
		tiebreak:this.tiebreak,
		highScoreWins:this.highScoreWins,
		highTiebreakWins:this.highTiebreakWins,
		scored:this.scored,

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

ConsistsOf.prototype.setScored = function(scored) {
	this.scored = scored;
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