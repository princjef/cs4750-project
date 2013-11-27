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

exports.update = function(req, res) {
	var organization = new Organization({
		name: req.body.name,
		id: req.body.id
	});

	organization.create(function(err) {
		if(err) {
			console.log('ERr', err);
			res.send(500);
		} else {
			res.json(organization.toJson());
		}
	});
};

exports.getByTournamentID = function(req, res) {
	Organization.getOrganizationByTournamentID(req.params.tournamentID, function(err, organizers) {
		if(err && err.err) {
			res.send(500, err);
		} else if (err && err.response){
			res.send(err.response.code, err.response.message);
		} else {
			var result = [];
			organizers.forEach(function(entry) {
				result.push(entry.toJson());
			});
			res.send(organizers);
		}
	});
};