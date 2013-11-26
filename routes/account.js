var Account = require('../model/Account');
var passport = require('passport');

exports.create = function(req, res) {
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

exports.login = function(req, res) {
	var account = new Account({
		username: req.body.username,
		password: req.body.password
	});

	account.login(function(err, successful) {
		if(err) {
			console.log('ERR', err);
			res.send(500);
		} else {
			if (successful) {
				req.login(account, function(err) {
					if (err) {
						res.send(500, err);
					}
				});
				res.json({
					status: true,
					user: account
				});
			} else {
				res.json({
					status: false
				});
			}
		}
	});
};

exports.logout = function(req, res) {
	req.logout();
	res.json({
		status: false
	});
};

exports.current = function(req, res) {
	res.json(req.user);
};