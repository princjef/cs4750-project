var express = require('express');
var passport = require('passport');

var app = express();

// Route files
var organization = require('./routes/organization');
var tournament = require('./routes/tournament');
var Event = require('./routes/event'); // Lowercase event is a keyword
var account = require('./routes/account');
var consistsOf = require('./routes/consistsOf');
var official = require('./routes/official');
var belongsTo = require('./routes/belongsTo');
var team = require('./routes/team');
var scoring = require('./routes/scoring');
var runBy = require('./routes/runBy');
var coachedBy = require('./routes/coachedBy');
var exportData = require('./routes/exportData');

// MIME Types
express.static.mime.define({'text/javascript': ['js']});

// Compression
app.use(express.compress());

// Parser
app.use(express.bodyParser());

// Pre-passport initialization
app.use(express.cookieParser());
app.use(express.session({ secret: 'eiuhiuhsnlkuah' }));

// Setup passport serialization/deserialization
passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user.toJson()));
});
passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Static Server
app.use('/js', express.static(__dirname + '/app/js'));
app.use('/partials', express.static(__dirname + '/app/partials'));
app.use('/assets', express.static(__dirname + '/app/assets'));
app.use('/css', express.static(__dirname + '/app/css'));

// Tournament Routes
app.get('/tournament/:id/info', tournament.info);
app.get('/tournament/:id/teams', team.getByTournamentID);
app.get('/tournament/:id/events', consistsOf.getByTournament);
app.get('/tournament/levels', tournament.levels);
app.post('/tournament/create', tournament.create);
app.post('/tournament/update', tournament.update);
app.post('/tournament/remove', tournament.remove);
app.post('/tournament/addevent', consistsOf.addEventToTournament);
app.post('/tournament/:id/addteam', team.addToTournament);
app.post('/tournament/:id/removeteam', team.remove);
app.post('/tournament/:id/updateteam', team.update);

// Export Routes
app.get('/exportData/:tournamentID/getData', exportData.getData);

// Scoring Routes
app.get('/scoring/:tournamentID/:division/ranks', scoring.divisionRanks);
app.get('/scoring/:tournamentID/:division/:eventName/participators', scoring.participators);
app.post('/scoring/:tournamentID/:division/:eventName/save', scoring.update);
app.get('/scoring/scoreCodes', scoring.scoreCodes);

// Organization Routes
app.get('/organization/:tournamentID/getorganizers', organization.getByTournamentID);
app.get('/organization/:organizationID/info', organization.info);
app.get('/organization/:organizationID/admins', organization.admins);
app.get('/organization/:organizationID/tournaments', tournament.getByOrganizationID);
app.post('/organization/:organizationID/admins/add', belongsTo.addToOrganization);
app.post('/organization/:organizationID/admins/remove', belongsTo.remove);
app.post('/organization/create', organization.create);
app.post('/organization/update', organization.update);
app.post('/organization/remove', organization.remove);
app.post('/organization/addtournament', runBy.create);

// Event Routes
app.get('/event/all', Event.getAllEvents);
app.post('/event/create', Event.createEvent);
app.get('/event/info', consistsOf.info);
app.post('/event/save', consistsOf.save);
app.get('/event/statuses', consistsOf.statuses);
app.post('/event/remove', consistsOf.remove);

//Official Routes
app.get('/official/all', official.getAllOfficials);
app.get('/official/:id/supervisedevents', official.getSupervisedEvents);
app.get('/official/:id/writtenevents', official.getWrittenEvents);
app.get('/official/:id/coachedteams', official.getCoachedTeams);
app.get('/official/:id/getbyid', official.getOfficialByID);
app.post('/official/create', official.createOfficial);
app.post('/official/update', official.updateOfficial);
app.post('/official/remove', official.removeOfficial);

// Account Routes
app.post('/account/create', account.create);
app.post('/account/updatePassword', account.updatePassword);
app.post('/account/updateEmail', account.updateEmail);
app.post('/account/login', account.login);
app.post('/account/addorganization', belongsTo.create);
app.get('/account/current', account.current);
app.get('/account/:username/organizations', organization.getByUsername);
app.post('/account/logout', account.logout);

// Team Routes
app.get('/team/:id/:division/:teamNumber/getcoaches', team.getCoaches);
app.post('/team/addcoach', coachedBy.create);
app.post('/team/removecoach', coachedBy.remove);

// All other routes
app.all('/*', function(req, res) {
	console.log("GET", req.path);
	res.sendfile('./app/index.html');
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port ' + port);
