var connection = require('../sql/connection')

var Event = function(obj) {
	this.eventName = obj.eventName;
	this.division = obj.division;
};

Event.create = function(callback) {
	connection.query("INSERT INTO Event(eventName, division) VALUES (?, ?)",
	[this.eventName, this.division], function(err, row) {
		if(err) {
			console.log('ERR:', err);
			callback(err);
		} else {
			console.log('INFO: Created Event');
			callback();
		}
	});
};

Event.update = function(callback) {
	connection.query("UPDATE Event SET eventName=?, division=? 
		WHERE eventName=? AND division=?",
		[obj.eventName, obj.division, this.eventName, this.division], 
		function(err, row) {
			if(err) {
				console.log('ERR:', err);
				callback(err);
			} else {
				console.log('INFO: Updated event');
				callback();
			}
		});
};