var connection = require('../sql/connection');
var error = require('../sql/error');

var Tournament = function(obj) {
	this.id = obj.id;
	this.name = obj.name;
	this.type = obj.type;
	this.location = obj.location || null;
	this.date = obj.date || null;
};

// Static Functions

/*
 * Gets the different types of tournaments possible
 * 
 * Params: callback function
 * Returns: array of type names, or an object with an error property
 */
Tournament.getLevels = function(callback) {
	connection.query("SHOW COLUMNS FROM Tournament LIKE 'tournamentType'", function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var match = rows[0].Type.match(/^enum\(\'(.*)\'\)$/)[1];
			callback(null, match.split('\',\''));
		}
	});
};

Tournament.getByOrganizationID = function(organizationID, callback) {
	connection.query("SELECT Tournament.* FROM Tournament NATURAL JOIN RunBy WHERE orgID=?",
			[organizationID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			var tournaments = [];
			rows.forEach(function(row) {
				tournaments.push(new Tournament({
					id: row.tournamentID,
					name: row.tournamentName,
					type: row.tournamentType,
					location: row.location,
					date: row.tournamentDate
				}));
			});
			callback(null, tournaments);
		}
	});
};

// Instance Functions

/*
 * Gets a Tournament using the ID provided
 * 
 * Params: callback function
 * Returns: error (if there is one)
 */
Tournament.prototype.getByID = function(callback) {
	var that = this;
	connection.query("SELECT * FROM Tournament WHERE tournamentID=?",
			[this.id], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			if(rows.length === 0) {
				callback('The tournament you requested does not exist');
			} else {
				that.type = rows[0].tournamentType;
				that.location = rows[0].location;
				that.name = rows[0].tournamentName;
				that.date = rows[0].tournamentDate;
				callback();
			}
		}
	});
};

/* 
 * Creates a Tournament in the database
 * 
 * Params: callback function
 * Returns: error (if there is one)
 */
Tournament.prototype.create = function(callback) {
	var that = this;
	connection.query("INSERT INTO Tournament (tournamentName, tournamentType, location, tournamentDate) VALUES (?, ?, ?, ?)",
			[this.name, this.type, this.location, this.date], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO: Created Tournament with ID:', row.insertId);
			that.id = row.insertId;
			callback();
		}
	});
};

/*
 * Updates a Tournament in the database
 * 
 * Params: callback function
 * Returns: error (if there is one)
 */
Tournament.prototype.update = function(callback) {
	var that = this;
	connection.query("UPDATE Tournament SET tournamentName=?, tournamentType=?, location=?, tournamentDate=? WHERE tournamentID=?",
			[this.name, this.type, this.location, this.date], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO', 'Updated Tournament with ID:', that.id);
			callback();
		}
	});
};

// Setters
Tournament.prototype.setID = function(id) {
	this.id = id;
	return this;
};

Tournament.prototype.setName = function(name) {
	this.name = name;
	return this;
};

Tournament.prototype.setType = function(type) {
	this.type = type;
	return this;
};

Tournament.prototype.setLocation = function(location) {
	this.location = location;
	return this;
};

Tournament.prototype.setDate = function(date) {
	this.date = date;
	return this;
};

// To JSON
Tournament.prototype.toJson = function() {
	return {
		id: this.id,
		name: this.name,
		type: this.type,
		location: this.location,
		date: this.date
	};
};

module.exports = Tournament;