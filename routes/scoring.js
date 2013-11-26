var ParticipatesIn = require('../model/ParticipatesIn');

exports.scoreCodes = function(req, res) {
	ParticipatesIn.getScoreCodes(function(result) {
		if(result.err) {
			res.send(500, result.err);
		} else {
			res.json(result);
		}
	});
};