var Event = require("../model/Event")

exports.create = function(req, res) {
	var event = new Event ({
		division: req.body.division,
		eventName: req.body.eventName
	});
	
	event.create(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(event.toJson());
		}
	});
};

exports.update = function(req, res) {
	var event = new Event ({
		division: req.body.division,
		eventName: req.body.eventName
	});
	
	event.update(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(event.toJson());
		}
	});
};