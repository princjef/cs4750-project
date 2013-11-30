var CoachedBy = require('../model/CoachedBy');
var permissions = require('../helper/permissions');

exports.create = function(req, res) {
	permissions.tournament(req, res, req.body.tournamentID, function() {
		var coachedBy = new CoachedBy({
			tournamentID:req.body.tournamentID,
			teamNumber:req.body.teamNumber,
			division:req.body.division,
			officialID:req.body.officialID
		});
		coachedby.create(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				res.json(coachedBy.toJson());
			}
		});
	});
};

exports.remove = function(req, res) {
	permissions.tournament(req, res, req.body.tournamentID, function() {
		var coachedBy = new CoachedBy({
			tournamentID:req.body.tournamentID,
			teamNumber:req.body.teamNumber,
			division:req.body.division,
			officialID:req.body.officialID
		});
		coachedby.remove(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				res.json(coachedBy.toJson());
			}
		});
	});
};