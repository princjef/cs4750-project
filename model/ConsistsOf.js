var connection = require('../sql/connection');

var ConsistsOf = function(obj) {
	this.tournamentID = obj.tournamentID;
	this.eventName = obj.eventName;
	this.division = obj.division;
	this.eventType = obj.eventType;
	
	this.tiebreak = obj.tiebreak;
	this.highScoreWins = obj.highScoreWins;
	this.highTiebreakWins = obj.highTiebreakWins;
	this.scored = obj.scored;
	
	this.supervisorID = obj.supervisorID;
	this.writerID = obj.writerID;
};

ConsistsOf.prototype.addEventToTournament = function() {
	connection.query('INSERT INTO ConsistsOf(tournamentID, eventName, division, eventType,'+
		' tiebreak, highScoreWins, highTiebreakWins, scored, supervisor_officialID, writer_officialID)'+
		' VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', this.tournamentID, this.eventName, this.division, this.eventType,
		this.tiebreak, this.highScoreWins, this.highTiebreakWins, this.scored, this.supervisorID, this.writerID);
};

ConsistsOf.prototype.updateEventInTournament = function() {
	connection.query('UPDATE ConsistsOf SET tournamentID=?, eventName=?, division=?, eventType=?,'+
		' tiebreak=?, highScoreWins=?, highTiebreakWins=?, scored=?, supervisor_officialID=?, writer_officialID=?)',
		this.tournamentID, this.eventName, this.division, this.eventType, this.tiebreak, this.highScoreWins, 
		this.highTiebreakWins, this.scored, this.supervisorID, this.writerID);
};


module.exports = ConsistsOf;