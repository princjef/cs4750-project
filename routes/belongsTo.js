var BelongsTo = require('../model/BelongsTo');
var Account = require('../model/Account');
var permissions = require('../helper/permissions');

exports.create = function(req, res) {
	permissions.organization(req, res, req.body.orgID, function() {
		var belongsTo = new BelongsTo({
			username:req.body.username,
			orgID:req.body.orgID
		});
		belongsTo.create(function (err) {
			if(err) {
				res.send(500, err);
			} else {
				res.json(belongsTo.toJson());
			}
		});
	});
};

exports.addToOrganization = function(req, res) {
	permissions.organization(req, res, req.params.organizationID, function() {
		Account.getByUsername(req.body.username, function(err, account) {
			if(err) {
				res.send(500, err);
			} else {
				var belongsTo = new BelongsTo({
					username: req.body.username,
					orgID: req.params.organizationID
				});
				belongsTo.create(function(err) {
					if(err) {
						res.send(500, err);
					} else {
						res.json(account.toJson());
					}
				});
			}
		});
	});
};

exports.remove = function(req, res) {
	permissions.organization(req, res, req.params.organizationID, function() {
		var belongsTo = new BelongsTo({
			username: req.body.username,
			orgID: req.params.organizationID
		});

		belongsTo.remove(function(err) {
			if(err) {
				res.send(500, err);
			} else {
				res.json(belongsTo.toJson());
			}
		});
	});
};