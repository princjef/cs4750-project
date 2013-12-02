var Tournament = require('../model/Tournament');
var Organization = require('../model/Organization');
var Event = require('../model/Event');
var ConsistsOf = require('../model/ConsistsOf');
var permissions = require('../helper/permissions');

exports.getData = function(req, res) {
	// Setup vars to hold all results
	var tournamentResult = {};
	var organizationResult = {};
	var eventsResult = {};

	// Tournament info
	permissions.tournament(req, res, req.params.tournamentID, function() {
		var tournament = new Tournament({
			id: req.params.id
		});

		tournament.getByID(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				tournamentResult = tournament.toJson();
				// res.json(tournamentResult);
			}
		});
	});

	// Organization info
	Organization.getOrganizationByTournamentID(req.params.tournamentID, function(err, organizers) {
		if(err) {
			res.send(500, err);
		} else {
			//var result = [];
			organizationResult = [];
			organizers.forEach(function(entry) {
				//result.push(entry.toJson());
				organizationResult.push(entry.toJson());
			});
			// res.send(organizationResult);
		}
	});

	// Events info
	permissions.tournament(req, res, req.params.tournamentID, function() {
		ConsistsOf.getByTournamentID(req.params.tournamentID, function(err, entries) {
			if(err) {
				res.send(500, err);
			} else {
				// var result = [];
				eventsResult = [];
				entries.forEach(function(entry) {
					eventsResult.push(entry.toJson());
				});
				// res.json(eventsResult);
			}
		});
	});

	res.json(tournamentResult, organizationResult, eventsResult);
};