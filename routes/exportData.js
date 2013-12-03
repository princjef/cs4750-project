var Tournament = require('../model/Tournament');
var Organization = require('../model/Organization');
var Event = require('../model/Event');
var ConsistsOf = require('../model/ConsistsOf');
var ParticipatesIn = require('../model/ParticipatesIn');
var CoachedBy = require('../model/CoachedBy');
var permissions = require('../helper/permissions');

exports.getData = function(req, res) {
	// Setup vars to hold all results
	var tournamentResult = null;
	var organizationResult = null;
	var eventsResult = null;
	var scoresResult = null;
	var coachesResult = null;

	permissions.tournament(req, res, req.params.tournamentID, function() {

		// Tournament info
		var tournament = new Tournament({
			id: req.params.tournamentID
		});

		tournament.getByID(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				tournamentResult = tournament.toJson();
				sendResult(res, tournamentResult, organizationResult, coachesResult, eventsResult, scoresResult);
			}
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
				sendResult(res, tournamentResult, organizationResult, coachesResult, eventsResult, scoresResult);
			}
		});

		// Coaches info
		CoachedBy.getCoachesByTournament(req.params.tournamentID, function(err, entries) {
			if(err) {
				res.send(500, err);
			} else {
				coachesResult = [];
				entries.forEach(function(entry) {
					coachesResult.push(entry.toJson());
				});
				sendResult(res, tournamentResult, organizationResult, coachesResult, eventsResult, scoresResult);
			}
		});

		// Events info
		ConsistsOf.getByTournamentID(req.params.tournamentID, function(err, entries) {
			if(err) {
				res.send(500, err);
			} else {
				eventsResult = [];
				entries.forEach(function(entry) {
					eventsResult.push(entry.toJson());
				});
				sendResult(res, tournamentResult, organizationResult, coachesResult, eventsResult, scoresResult);
			}
		});

		// Scores info
		ParticipatesIn.getParticipatingTeamsByTournament(req.params.tournamentID, function(err, entries) {
			if(err) {
				res.send(500, err);
			} else {
				scoresResult = [];
				entries.forEach(function(entry) {
					scoresResult.push(entry.toJson());
				});
				sendResult(res, tournamentResult, organizationResult, coachesResult, eventsResult, scoresResult);
			}
		});
	});
};

var sendResult = function(res, tournament, organizers, coaches, eventsByStatus, scores) {
	if(tournament && organizers && eventsByStatus && coaches && scores) {
		res.json({
			tournament: tournament,
			organizers: organizers,
			coaches: coaches,
			eventsByStatus: eventsByStatus,
			scores: scores
		});
	}
};