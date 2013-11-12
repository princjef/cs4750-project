var connection = require('../sql/connection');

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
			console.log('ERR', err);
			callback({err: 'Could not complete query'});
		} else {
			var match = rows[0].Type.match(/^enum\(\'(.*)\'\)$/)[1];
			callback(match.split('\',\''));
		}
	});
};


// Instance Functions

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
			console.log('ERR:', err);
			callback(err);
		} else {
			console.log('INFO: Created Tournament with ID:', row.insertId);
			that.id = row.insertId;
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