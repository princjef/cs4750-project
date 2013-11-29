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

Official.prototype.getSupervisedEvents = function(callback) {
	var that = this;
	connection.query('SELECT tournamentID, tournamentName, eventName, division FROM (Tournament NATURAL JOIN ConsistsOf) INNER JOIN Official ON Official.officialID=ConsistsOf.supervisor_officialID WHERE officialID=?',
	[this.officialID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(err);
		} else {
			result = [];
			rows.forEach(function(entry) {
				result.push({
					tournamentID:entry.tournamentID,
					tournamentName:entry.tournamentName,
					eventName:entry.eventName,
					division:entry.division
				});
			});
			console.log('INFO: Got ' + result.length + ' supervised events for official ' + that.officialID);
			callback(null, result);
		}
	});
};

Official.prototype.getWrittenEvents = function(callback) {
	var that = this;
	connection.query('SELECT tournamentID, tournamentName, eventName, division FROM (Tournament NATURAL JOIN ConsistsOf) INNER JOIN Official ON Official.officialID=ConsistsOf.writer_officialID WHERE officialID=?',
	[this.officialID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(err);
		} else {
			result = [];
			rows.forEach(function(entry) {
				result.push({
					tournamentID:entry.tournamentID,
					tournamentName:entry.tournamentName,
					eventName:entry.eventName,
					division:entry.division
				});
			});
			console.log('INFO: Got ' + result.length + ' written events for official ' + that.officialID);
			callback(null, result);
		}
	});
};

Official.prototype.getCoachedTeams = function(callback) {
	var that = this;
	connection.query('SELECT * FROM Official NATURAL JOIN CoachedBy NATURAL JOIN Team NATURAL JOIN Tournament WHERE officialID=?',
		[this.officialID], function(err, rows) {
			if(err) {
				console.log(err);
				callback(err);
			} else {
				var result = [];
				rows.forEach(function(entry) {
					result.push({
						tournamentName:entry.tournamentName,
						name:entry.teamName,
						division:entry.division,
						number:entry.teamNumber,
						school:entry.school,
						state:entry.state
					});
				});
				console.log('INFO: Got ' + result.length + ' coached teams for official ' + that.officialID);
				callback(null, result);
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
			callback(null, rows);
		}
	});
};

Official.getOfficialByID = function(officialID, callback) {
	connection.query('SELECT * FROM Official WHERE officialID=?', [officialID], function(err, rows) {
		if(err) {
			console.log(err);
			callback(err);
		} else {
			console.log('INFO: got official');
			callback(null, rows[0]);
		}
	});
};

module.exports = Official;