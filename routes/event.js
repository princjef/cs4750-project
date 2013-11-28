var Event = require('../model/Event');

exports.createEvent = function(req, res) {
	var event = new Event({
		division: req.body.division.value,
		name: req.body.name
	});
	
	event.create(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(eevent.toJson());
		}
	});
};

exports.updateEvent = function(req, res) {
	var eevent = new Event ({
		division: req.body.division.value,
		name: req.body.name
	});
	
	eevent.update(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(eevent.toJson());
		}
	});
};

exports.getAllEvents = function(req, res) {
	Event.getAllEvents(function(err, result) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(result);
		}
	});
};