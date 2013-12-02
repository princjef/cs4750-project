var Event = require('../model/Event');
var permissions = require('../helper/permissions');

exports.createEvent = function(req, res) {
	if(!req.user) {
		res.send(401);
	} else {
		var event = new Event({
			division: req.body.division,
			name: req.body.name
		});
		
		event.create(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				res.json(event.toJson());
			}
		});
	}
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