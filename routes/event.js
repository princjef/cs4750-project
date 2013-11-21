var Event = require('../model/Event');

exports.createEvent = function(req, res) {
	var eevent = new Event({
		division: req.body.division.value,
		name: req.body.name
	});
	
	eevent.create(function(err) {
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