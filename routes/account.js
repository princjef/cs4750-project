var Account = require('../model/Account');
var passport = require('passport');
var permissions = require('../helper/permissions');

exports.create = function(req, res) {
	var account = new Account({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});

	if (req.body.password != req.body.passwordReentered) {
		res.send(500, 'ERROR: Passwords do not match.');
	}

	else {
		account.create(function(err, successful) {
			if(err) {
				if (err.code == 'ER_DUP_ENTRY') {
					console.log('ERR', err);
					res.send(500, 'ERROR: Duplicate account name exists.');
				} else {
					console.log('Err', err);
					res.send(500, 'ERROR: The server encountered an error.');
				}
			} else {
				if (successful) {
					res.json({
						status: true,
						user: account.toJson()
					});
				} else {
					res.json({
						status: false
					});
				}
			}
		});
	}
};

exports.update = function(req, res) {
	permissions.user(req, res, req.user.username, function() {
		var account = new Account({
			username: req.user.username,
			email: req.body.newEmail,
			password: req.body.newPassword
		});

		if (req.body.newPassword != req.body.newPasswordReentered) {
			res.send(500, 'ERROR: Passwords do not match.');
		}

		if (req.body.newEmail != req.body.newEmailReentered) {
			res.send(500, 'ERROR: Emails do not match.');
		}

		if (req.body.newPassword.length === 0) {
			account.password = req.user.password;
		}

		if (req.body.newEmail.length === 0) {
			account.email = req.user.email;
		}

		account.update(function(err, successful) {
			if(err) {
				res.send(500, err);
			} else {
				if (successful) {
					res.json({
						status: true,
						user: account.toJson()
					});
				} else {
					res.json({
						status: false
					});
				}
			}
		});
	});
};

exports.login = function(req, res) {
	var account = new Account({
		username: req.body.username,
		password: req.body.password
	});

	account.login(function(err, successful) {
		if(err) {
			res.send(500, err);
		} else {
			if (successful) {
				req.login(account, function(err) {
					if (err) {
						res.send(500, 'Login unsuccessful');
					}
				});
				res.json({
					status: true,
					user: account.toJson()
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
		status: true
	});
};

exports.current = function(req, res) {
	res.json(req.user);
};