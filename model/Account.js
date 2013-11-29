var connection = require('../sql/connection');
var error = require('../sql/error');
var bcrypt = require('bcrypt');

var Account = function(obj) {
	this.username = obj.username;
	this.email = obj.email;
	this.password = obj.password;
};

// Instance Functions

/*
 * Creates a new Account from the current object
 *
 * Params: callback function
 * Returns: error (if there is one)
 */
Account.prototype.create = function(callback) {
	var that = this;

	Account.hashSaltPass(this.password, function(err, hash) {
		if (err) console.log('ERR', err);
		else {
			connection.query("INSERT INTO Account(username, email, password) VALUES (?, ?, ?)",
			[that.username, that.email, that.password/*hash*/], function(err, result) {
				console.log('result is:', result);
				if(err) {
					console.log(err);
					callback(error.message(err), false);
				} else if (result.affectedRows > 0) {
					console.log('INFO', 'Created Account', that.username);
					callback(null, true);
				} else {
					console.log('INFO', 'User', that.username, 'does not exist!');
					callback(null, false);
				}
			});
		}
	});
};

/*
 * Updates the current Account in the database
 *
 * Params: callback function
 * Returns: error (if there is one)
 */
Account.prototype.update = function(callback) {
	// THIS IS WRONG FOR NOW
	// WILL FIX IT IF I EVER GET LOGIN TO WORK
	var that = this;
	connection.query("UPDATE Account SET email=?, password=? WHERE username=?",
	[this.email, Account.hashSaltPass(this.password), this.username], function(err, result) {
		if(err) {
			console.log(err);
			callback(error.message(err), false);
		} else if(result.affectedRows > 0) {
			console.log('INFO', 'Updated Account with username:', that.username);
			callback(null, true);
		} else {
			console.log('INFO', 'User', that.username, 'does not exist!');
			callback(null, false);
		}
	});
};

/*
 * Logs a user into the system
 *
 * Params: callback function
 * Returns: error (if there is one)
 */
 Account.prototype.login = function(callback) {
	var that = this;
	var hashedPass;

	connection.query("SELECT * FROM Account WHERE username=?",
	[this.username], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err), null);
		} else {
			// if (row.length > 0) {
				// hashedPass = row[0].password;

				// Account.comparePass(that.password, hashedPass, function(err, result) {
				// 	console.log('result is:', result);
				// 	if (err || !result) {
				// 		console.log('INFO', 'Invalid username and/or password!');
				// 		callback(null, false);
				// 	} else {
				// 		console.log('INFO', 'Logged in with username:', that.username);
				// 		that.email = row[0].email;
				// 		callback(null, true);
				// 	}
				// });
			// }
			if (row.length > 0 && row[0].password == that.password) {
				console.log('INFO', 'Logged in with username:', that.username);
				that.email = row[0].email;
				callback(null, true);
			} else {
				console.log('INFO', 'User', that.username, 'does not exist!');
				callback(null, false);
			}
		}
	});
 };

Account.prototype.setUsername = function(username) {
	this.username = username;
	return this;
};

Account.prototype.setPassword = function(password) {
	this.password = password;
	return this;
};

Account.prototype.setEmail = function(email) {
	this.email = email;
	return this;
};

// To JSON
Account.prototype.toJson = function() {
	return {
		username: this.username,
		email: this.email
	};
};

Account.getByUsername = function(username, callback) {
	connection.query("SELECT * FROM Account WHERE username=?",
			[username], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else if(rows.length === 0) {
			callback('The user you requested does not exist');
		} else {
			var account = new Account(rows[0]);
			callback(null, account);
		}
	});
};

Account.hashSaltPass = function(password, callback) {
	bcrypt.hash(password, 10, function(err, hash) {
		callback(err, hash);
	});
};

Account.comparePass = function(password, hash, callback) {
	bcrypt.compare(password, hash, function(err, res) {
		console.log('login result is:', res);
		callback(err, res);
	});
};

module.exports = Account;
