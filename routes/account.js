var Account = require('../model/Account')

exports.create = function(req, res) {
	console.log('Test');
	var account = new Account({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	account.create(function(err) {
		if(err) {
			console.log('ERR', err);
			res.send(500);
		} else {
			res.json(account.toJson());
		}
	});
};

exports.update = function(req, res) {
	var account = new Account({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	account.update(function(err) {
		if(err) {
			console.log('ERR', err);
			res.send(500);
		} else {
			res.json(account.toJson());
		}
	});
};

exports.login= function(req, res) {
	var account = new Account({
		username: req.body.username,
		password: req.body.password
	});

	account.login(function(err) {
		if(err) {
			console.log('ERR', err);
			res.send(500);
		} else {
			
		}
	});
};