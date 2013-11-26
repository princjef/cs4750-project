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
app.get('/tournament/:tournamentID/:division/:eventName/participators', tournament.participators);
app.get('/tournament/levels', tournament.levels);
app.post('/tournament/create', tournament.create);
app.post('/tournament/update', tournament.update);
app.post('/tournament/addevent', consistsOf.addEventToTournament);

// Scoring Routes
app.get('/scoring/scoreCodes', scoring.scoreCodes);

// Organization Routes
app.post('/organization/create', organization.create);
app.post('/organization/update', organization.update);
app.post('/organization/addtournament', runBy.create);

// Event Routes
app.get('/event/all', Event.getAllEvents);
app.post('/event/create', Event.createEvent);

//Official Routes
app.get('/official/all', official.getAllOfficials);
app.post('/official/create', official.createOfficial);

// Account Routes
app.post('/account/create', account.create);
app.post('/account/update', account.update);
app.post('/account/login', account.login);
app.post('/account/addorganization', belongsTo.create);
app.get('/account/current', account.current);
app.post('/account/logout', account.logout);

// All other routes
app.all('/*', function(req, res) {
	console.log("GET", req.path);
	res.sendfile('./app/index.html');
});

app.listen(8080);
console.log('Listening on port 8080');
