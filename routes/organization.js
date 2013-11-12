var Organization = require('../model/Organization');

exports.create = function(req, res) {
	var organization = new Organization({
		name: req.body.name
	});
	
	organization.create(function(err) {
		if(err) {
			console.log('ERR', err);
			res.send(500);
		} else {
			res.json(organization.toJson());
		}
	});
};