var connection = require('../sql/connection');
var error = require('../sql/error');
var Account = require('../model/Account');

var Organization = function(obj) {
	this.id = obj.id;
	this.name = obj.name;
};

// Instance Functions

/*
 * Creates a new Organization from the current object
 *
 * Params: callback function
 * Returns: error (if there is one)
 */
Organization.prototype.create = function(callback) {
	connection.query("INSERT INTO Organization (orgName) VALUES (?)",
			[this.name], function(err, info) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			this.id = info.insertId;
			console.log('INFO', 'Organization created with ID:', info.insertId);
			callback();
		}
	});
};

/*
 * Updates the current Organization in the database
 * 
 * Params: callback function
 * Returns: error (if there is one)
 */
Organization.prototype.update = function(callback) {
	var that = this;
	connection.query("UPDATE Organization SET orgName=? WHERE orgID=?",
			[this.name, this.id], function(err, info) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO', 'Updated Organization with ID: ', that.id);
			callback();
		}
	});
};

Organization.prototype.getAdmins = function(callback) {
	var that = this;
	connection.query("SELECT Account.* FROM Account NATURAL JOIN BelongsTo WHERE orgID=?",
			[this.id], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var accounts = [];
			rows.forEach(function(account) {
				accounts.push(new Account(account));
			});
			callback(null, accounts);
		}
	});
};

Organization.getByID = function(organizationID, callback) {
	connection.query("SELECT * FROM Organization WHERE orgID=?",
			[organizationID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			callback(null, new Organization({
				id: rows[0].orgID,
				name: rows[0].orgName
			}));
		}
	});
};

Organization.getOrganizationByTournamentID = function(tournamentID, callback) {
	connection.query("SELECT * FROM Organization NATURAL JOIN RunBy WHERE tournamentID=?", [tournamentID], function(err, rows) {
		if(err) {
			console.log(err);
			callabck(error.message(err));
		} else {
			if(rows.length === 0) {
				callback('This tournament has no organizers on record');
			} else {
				var organizers = [];
				rows.forEach(function(entry) {
					organizers.push(new Organization({
						id:entry.orgID,
						name:entry.orgName}));
				});
				callback(null, organizers);
			}
		}
	});
};

// Setters
Organization.prototype.setID = function(id) {
	this.id = id;
	return this;
};

Organization.prototype.setName = function(name) {
	this.name = name;
	return this;
};

// To JSON
Organization.prototype.toJson = function() {
	return {
		id: this.id,
		name: this.name
	};
};

module.exports = Organization;