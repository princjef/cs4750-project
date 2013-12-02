var Tournament = require('../model/Tournament');
var Organization = require('../model/Organization');
var Event = require('../model/Event');
var ConsistsOf = require('../model/ConsistsOf');
var permissions = require('../helper/permissions');

exports.getData = function(req, res) {
	// Setup vars to hold all results
	var tournamentResult = null;
	var organizationResult = null;
	var eventsResult = null;

	// Tournament info
	permissions.tournament(req, res, req.params.tournamentID, function() {
		var tournament = new Tournament({
			id: req.params.tournamentID
		});

		tournament.getByID(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				tournamentResult = tournament.toJson();
				sendResult(res, tournamentResult, organizationResult, eventsResult);
			}
		});
	});

	// Organization info
	Organization.getOrganizationByTournamentID(req.params.tournamentID, function(err, organizers) {
		if(err) {
			res.send(500, err);
		} else {
			organizationResult = [];
			organizers.forEach(function(entry) {
				organizationResult.push(entry.toJson());
			});

			sendResult(res, tournamentResult, organizationResult, eventsResult);
		}
	});

	// Events info
	permissions.tournament(req, res, req.params.tournamentID, function() {
		ConsistsOf.getByTournamentID(req.params.tournamentID, function(err, entries) {
			if(err) {
				res.send(500, err);
			} else {
				eventsResult = [];
				entries.forEach(function(entry) {
					eventsResult.push(entry.toJson());
				});
				sendResult(res, tournamentResult, organizationResult, eventsResult);
			}
		});
	});
};

var sendResult = function(res, tournament, organizers, eventsByStatus) {
	if(tournament && organizers && eventsByStatus) {
		res.json({
			tournament: tournament,
			organizers: organizers,
			eventsByStatus: eventsByStatus
		});
	}
};