var Organization = require('../model/Organization');

exports.info = function(req, res) {
	Organization.getByID(req.params.organizationID, function(err, org) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(org.toJson());
		}
	});
};

exports.create = function(req, res) {
	var organization = new Organization({
		name: req.body.name
	});
	
	organization.create(function(err) {
		if(err) {
			res.send(500, err);
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
			res.send(500, err);
		} else {
			res.json(organization.toJson());
		}
	});
};

exports.getByTournamentID = function(req, res) {
	Organization.getOrganizationByTournamentID(req.params.tournamentID, function(err, organizers) {
		if(err) {
			res.send(500, err);
		} else {
			var result = [];
			organizers.forEach(function(entry) {
				result.push(entry.toJson());
			});
			res.send(organizers);
		}
	});
};

exports.admins = function(req, res) {
	var organization = new Organization({
		id: req.params.organizationID
	});

	organization.getAdmins(function(err, accounts) {
		if(err) {
			res.send(500, err);
		} else {
			var result = [];
			accounts.forEach(function(account) {
				result.push(account.toJson());
			});
			res.json(result);
		}
	});
};