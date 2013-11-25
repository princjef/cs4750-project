var BelongsTo = require('../model/BelongsTo');

exports.create = function(req, res) {
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
};