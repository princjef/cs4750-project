var connection = require('../sql/connection');
var error = require('../sql/error');

Official = function(obj) {
	this.officialID = obj.officialID;
	this.name_first = obj.name_first;
	this.name_last = obj.name_last;
	this.email = obj.email;
	this.phone = obj.phone;
};

Official.prototype.create = function(callback) {
	var that = this;
	connection.query("INSERT INTO Official(name_first, name_last, email, phone) VALUES(?, ?, ?, ?)",
	[this.name_first, this.name_last, this.email, this.phone], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			that.officialID = row.insertId;
			console.log('INFO: Creates a new official with ID:', that.officialID);
			callback();
		}
	});
};

Official.prototype.update = function(callback) {
	var that = this;
	connection.query("UPDATE Official SET name_first=?, name_last=?, email=?, phone=? WHERE officialID=?",
	[this.name_first, this.name_last, this.email, this.phone, this.officialID], function(err, row) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			that.officialID = row.officialID;
			console.log('INFO: Updated official with ID:', that.officalID);
			callback();
		}
	});
};

Official.prototype.setFirstName = function(name_first) {
	this.name_first = name_first;
	return this;
};

Official.prototype.setLastName = function(name_last) {
	this.name_last = name_last;
	return this;
};

Official.prototype.setEmail = function(email) {
	this.email = email;
	return this;
};

Official.prototype.setPhone = function(phone) {
	this.phone = phone;
	return this;
};

Official.prototype.toJson = function() {
	return {
		officialID:this.officialID,
		name_first:this.name_first,
		name_last:this.name_last,
		email:this.email,
		phone:this.phone
	};
};

Official.getOfficials = function(callback) {
	connection.query('SELECT * FROM Official', [], function(err, rows) {
		if(err) {
			console.log(err);
			callback(error.message(err));
		} else {
			console.log('INFO: Returned all officials');
			callback(rows);
		}
	});
};

module.exports = Official;