var connection = require('../sql/connection');
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
	connection.query("INSERT INTO Account(username, email, password) VALUES (?, ?, ?)",
	[this.username, this.email, Account.hashSaltPass(this.password)], function(err, result) {
		console.log(result);
		if(err) {
			console.log('ERR', err);
			callback(err, false);
		} else if (result.affectedRows > 0) {
			console.log('INFO', 'Created Account', that.username);
			callback(null, true);
		} else {
			console.log('INFO', 'User', that.username, 'does not exist!');
			callback(null, false);
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
	[this.email, Account.hashSaltPass(this.password), this.username], function(err, result) {
		if(err) {
			console.log('ERR', err);
			callback(err, false);
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
		if(!err) {
			if (row.length > 0) {
				hashedPass = row[0].password;
				console.log(hashedPass);

				if (Account.comparePass(that.password, hashedPass)) {
					console.log('INFO', 'Logged in with username:', that.username);
					that.email = row[0].email;
					callback(null, true);
				} else {
					console.log('INFO', 'Invalid username and/or password!');
					callback(null, false);
				}
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

Account.hashSaltPass = function(password) {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	return hash;
};

Account.comparePass = function(password, hash) {
	console.log('hash is', hash);
	console.log('password is', password);

	console.log(bcrypt.hashSync(password, hash));

	console.log(bcrypt.compareSync(password, hash));
	return bcrypt.compareSync(password, hash);
};

module.exports = Account;
