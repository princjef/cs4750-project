var RunBy = require('../model/RunBy');

exports.create = function(req, res) {
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
};