var connection = require('../sql/connection');

var Tournament = function(obj) {
	this.id = obj.id;
	this.name = obj.name;
	this.type = obj.type;
	this.location = obj.location || null;
	this.date = obj.date || null;
};

// Getters
Tournament.prototype.getID = function() {
	return this.id;
};

Tournament.prototype.getName = function() {
	return this.name;
};

Tournament.prototype.getType = function() {
	return this.type;
};

Tournament.prototype.getLocation = function() {
	return this.location;
};

Tournament.prototype.getDate = function() {
	return this.date;
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