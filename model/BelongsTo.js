var connection = require('../sql/connection');
var error = require('../sql/error');

var BelongsTo = function(obj) {
	this.username = obj.username;
	this.orgID = obj.orgID;
};

BelongsTo.prototype.create = function(callback) {
	connection.query("INSERT INTO BelongsTo(username, orgID) VALUES (?, ?)", [this.username, this.orgID], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO: Successfully added an account to an organization');
			callback();
		}
	});
};

BelongsTo.prototype.remove = function(callback) {
	connection.query("DELETE FROM BelongsTo WHERE username=? and orgID=?",
			[this.username, this.orgID], function(err, result) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else if(result.affectedRows === 0) {
			callback('The specified user is not an admin for this organization');
		} else {
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