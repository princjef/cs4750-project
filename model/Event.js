var connection = require('../sql/connection');
var error = require('../sql/error');

var Event = function(obj) {
	this.name = obj.name || obj.eventName;
	this.division = obj.division;
};

Event.prototype.create = function(callback) {
	connection.query("INSERT INTO Event(eventName, division) VALUES (?, ?)",
	[this.name, this.division], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO: Created Event');
			callback();
		}
	});
};

Event.prototype.toJson = function() {
	return {
		name: this.name,
		division: this.division
	};
};

Event.prototype.setName = function(name) {
	this.name = name;
	return this;
};

Event.prototype.setDivision = function(division) {
	this.division = division;
	return this;
};

Event.getAllEvents = function(callback) {
	connection.query("SELECT eventName, division FROM Event", [], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO: Returned all events');
			callback(null, row);
		}
	});
};
module.exports = Event;