var connection = require('./connection');
var Tournament = require('../model/Tournament');

/* 
 * Creates a Tournament in the database
 * 
 * Params: Tournament model, callback function
 * Returns: tournament id, or an object with an error property
 */
exports.create = function(tournament, callback) {
	connection.query("INSERT INTO Tournament (tournamentName, tournamentType, location, tournamentDate) VALUES (?, ?, ?, ?)",
			[tournament.getName(), tournament.getType(), tournament.getLocation(), tournament.getDate()], function(err, row) {
		if(err) {
			console.log('ERR', err);
			callback({err: 'Could not complete query'});
		} else {
			console.log('INFO: Created Tournament with ID:', row.insertId);
			callback(row.insertId);
		}
	});
};

/*
 * Gets the different types of tournaments possible
 * 
 * Params: callback function
 * Returns: array of type names, or an object with an error property
 */
exports.getLevels = function(callback) {
	connection.query("SHOW COLUMNS FROM Tournament LIKE 'tournamentType'", function(err, rows) {
		if(err) {
			console.log('ERR', err);
			callback({err: 'Could not complete query'});
		} else {
			var match = rows[0].Type.match(/^enum\(\'(.*)\'\)$/)[1];
			callback(match.split('\',\''));
		}
	});
};