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
	Official.getOfficials(function(err, result) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(result);
		}
	});
};

exports.getSupervisedEvents = function(req, res) {
	var official = new Official({
		officialID:req.params.id,
		name_first:req.body.name_first,
		name_last:req.body.name_last,
		email:req.body.email,
		phone:req.body.phone
	});
	
	official.getSupervisedEvents(function(err, result) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(result);
		}
	});
};

exports.getWrittenEvents = function(req, res) {
	var official = new Official({
		officialID:req.params.id
	});
	
	official.getWrittenEvents(function(err, result) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(result);
		}
	});
};

exports.getCoachedTeams = function(req, res) {
	var official = new Official({
		officialID:req.params.id
	});
	
	official.getCoachedTeams(function(err, result) {
		if(err) {
			res.send(500, err);
		} else {
			res.json(result);
		}
	});
};

exports.getOfficialByID = function(req, res) {
	console.log('Got REquest');
	Official.getOfficialByID(req.params.id, function(err, result) {
		if(err) {
			res.send(500, err);
		} else {
			var official = new Official(result);
			res.json(official.toJson());
		}
	});
};