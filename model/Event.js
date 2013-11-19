var connection = require('../sql/connection');

var Event = function(obj) {
	this.name = obj.name;
	this.division = obj.division;
};

Event.prototype.create = function(callback) {
	connection.query("INSERT INTO Event(eventName, division) VALUES (?, ?)",
	[this.name, this.division], function(err, row) {
		if(err) {
			console.log('ERR:', err);
			callback(err);
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
	}
}

