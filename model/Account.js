var connection = require('../sql/connection');

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
	connection.query("INSERT INTO Account(username, email, password) VALUES (?, ?, ?)", 
	[this.username, this.email, this.password], function(err) {
		if(err) {
			console.log('ERR', err);
			callback(err);
		} else {
			console.log('INFO: Created Account');
			callback();
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
	var that = this;
	connection.query("UPDATE Account SET email=?, password=? WHERE username=?",
	[this.email, this.password, this.username], function(err) {
		if(err) {
			console.log('ERR', err);
			callback(err);
		} else {
			console.log('INFO', 'Updated Account with username:', that.username);
			callback();
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
	connection.query("SELECT * FROM Account WHERE username=? AND password=?",
	[this.username, this.password], function(err, row) {
		if(err) {
			console.log('ERR', err);
			callback(err, null);
		} else {
			if (row.length > 0) {
				console.log('INFO', 'Logged in with username:', that.username);
				that.email = row[0].email;
				callback(null, true);
			}
			console.log('INFO', 'User', that.username, 'does not exist!');
			callback(null, false);
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
	ths.email = email;
	return this;
};

// To JSON
Account.prototype.toJson = function() {
	return {
		username: this.username,
		email: this.email
	};
};

module.exports = Account;
