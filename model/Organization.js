var connection = require('../sql/connection');

var Organization = function(obj) {
	this.id = obj.id;
	this.name = obj.name;
};

// Instance Functions

/*
 * Creates a new organization from the current object
 *
 * Params: callback function
 * Returns: error (if there is one)
 */
Organization.prototype.create = function(callback) {
	connection.query("INSERT INTO Organization (orgName) VALUES (?)",
			[this.name], function(err, info) {
		if(err) {
			console.log('ERR', err);
			callback(err);
		} else {
			this.id = info.insertId;
			console.log('INFO', 'Organization created with ID:', info.insertId);
			callback();
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