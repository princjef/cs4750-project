var Official = require('../model/Official');

exports.createOfficial = function(req, res) {
	var official = new Official({
		name_first:req.body.name_first,
		name_last:req.body.name_last,
		email:req.body.email,
		phone:req.body.phone
	});
	
	official.create(function(err) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(official.toJson());
		}
	});
};

exports.getAllOfficials = function(req, res) {
	Official.getOfficials(function(result) {
		if(result.err) {
			res.send(500, result.err);
		} else {
			res.json(result);
		}
	});
};