var connection = require('../sql/connection');
var error = require('../sql/error');

var RunBy = function(obj) {
	this.orgID = obj.orgID;
	this.tournamentID = obj.tournamentID;
};

RunBy.prototype.create = function(callback) {
	connection.query('INSERT INTO RunBy(orgID, tournamentID) VALUES (?, ?)', [this.orgID, this.tournamentID], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO: Added a tournament to an organization');
			callback();
		}
	});
};

RunBy.prototype.toJson = function() {
	return {
		orgID:this.orgID,
		tournamentID:this.tournamentID
	};
};

module.exports = RunBy;