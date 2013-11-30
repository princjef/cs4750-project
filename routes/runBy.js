var RunBy = require('../model/RunBy');
var permissions = require('../helper/permissions');

exports.create = function(req, res) {
	permissions.tournament(req, res, req.body.tournamentID, function() {
		var runBy = new RunBy({
			orgID:req.body.orgID,
			tournamentID:req.body.tournamentID
		});
		runBy.create(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				res.json(runBy.toJson());
			}
		});
	});
};