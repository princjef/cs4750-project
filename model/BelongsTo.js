var connection = require('../sql/connection');

var BelongsTo = function(obj) {
	this.username = obj.username;
	this.orgID = obj.orgID;
};

BelongsTo.prototype.create = function(callback) {
	connection.query("INSERT INTO BelongsTo(username, orgID) VALUES (?, ?)", [this.username, this.orgID], function(err, row) {
		if(err) {
			console.log('ERR', err);
			callback(err);
		} else {
			console.log('INFO: Successfully added an account to an organization');
			callback();
		}
	});
};

BelongsTo.prototype.toJson = function() {
	return {
		username:this.username,
		orgID:this.orgID
	};
};

module.exports = BelongsTo;