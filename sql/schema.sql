CREATE TABLE Account (
	username VARCHAR(50) NOT NULL,
	email VARCHAR(100),
	password VARCHAR(200) NOT NULL,
	PRIMARY KEY (username));

CREATE TABLE Organization (
	orgID INTEGER NOT NULL AUTO_INCREMENT,
	orgName VARCHAR(100) NOT NULL,
	PRIMARY KEY (orgID));

CREATE TABLE Tournament (
	tournamentID INTEGER NOT NULL AUTO_INCREMENT,
	tournamentType ENUM('Invitational', 'Regional', 'State', 'National', 'Other') NOT NULL,
	location VARCHAR(100),
	tournamentName VARCHAR(100) NOT NULL,
	tournamentDate DATE,
	eventMedalCount INTEGER NOT NULL,
	overallTrophyCount INTEGER NOT NULL,
	oneTrophyPerSchool BOOLEAN DEFAULT 0,
	PRIMARY KEY (tournamentID));

CREATE TABLE Official (
	officialID INTEGER NOT NULL AUTO_INCREMENT,
	name_first VARCHAR(30) NOT NULL,
	name_last VARCHAR(50) NOT NULL,
	email VARCHAR(100),
	phone VARCHAR(15),
	PRIMARY KEY (officialID));

CREATE TABLE Event (
	eventName VARCHAR(50) NOT NULL,
	division ENUM('A', 'B', 'C') NOT NULL,
	PRIMARY KEY (eventName, division));

CREATE TABLE Team (
	tournamentID INTEGER NOT NULL,
	teamNumber INTEGER NOT NULL,
	division ENUM('A', 'B', 'C') NOT NULL,
	teamName VARCHAR(50) NOT NULL,
	state VARCHAR(2) NOT NULL,
	school VARCHAR(100) NOT NULL,
	scoreAdjustment INTEGER DEFAULT 0,
	PRIMARY KEY (teamNumber, division, tournamentID),
	FOREIGN KEY (tournamentID) REFERENCES Tournament(tournamentID) ON DELETE CASCADE);

CREATE TABLE BelongsTo (
	username VARCHAR(50) NOT NULL,
	orgID INTEGER NOT NULL,
	PRIMARY KEY (username, orgID),
	FOREIGN KEY (username) REFERENCES Account(username) ON DELETE CASCADE,
	FOREIGN KEY (orgID) REFERENCES Organization(orgID) ON DELETE CASCADE);

CREATE TABLE RunBy (
	orgID INTEGER NOT NULL,
	tournamentID INTEGER NOT NULL,
	PRIMARY KEY (orgID, tournamentID),
	FOREIGN KEY (orgID) REFERENCES Organization(orgID) ON DELETE CASCADE,
	FOREIGN KEY (tournamentID) REFERENCES Tournament(tournamentID) ON DELETE CASCADE);

CREATE TABLE CoachedBy (
	tournamentID INTEGER NOT NULL,
	teamNumber INTEGER NOT NULL,
	division ENUM('A', 'B', 'C') NOT NULL,
	officialID INTEGER NOT NULL,
	PRIMARY KEY (tournamentID, teamNumber, division, officialID),
	FOREIGN KEY (tournamentID, teamNumber, division) REFERENCES Team(tournamentID, teamNumber, division) ON DELETE CASCADE,
	FOREIGN KEY (officialID) REFERENCES Official(officialID) ON DELETE RESTRICT);

CREATE TABLE ConsistsOf (
	tournamentID INTEGER NOT NULL,
	eventName VARCHAR(50) NOT NULL,
	division ENUM('A', 'B', 'C'),
	supervisor_officialID INTEGER,
	writer_officialID INTEGER,
	eventType ENUM('Standard', 'Trial') NOT NULL DEFAULT 'Standard', -- Standard corresponds to normally scored events, while Trial corresponds to trial events
	status ENUM('Not Started', 'In Progress', 'Completed') NOT NULL DEFAULT 'Not Started',
	highScoreWins BOOLEAN NOT NULL DEFAULT 1,
	highTiebreakWins BOOLEAN NOT NULL DEFAULT 1,
	presented BOOLEAN NOT NULL DEFAULT 0,
	PRIMARY KEY (tournamentID, eventName, division),
	FOREIGN KEY (tournamentID) REFERENCES Tournament(tournamentID) ON DELETE CASCADE,
	FOREIGN KEY (eventName, division) REFERENCES Event(eventName, division) ON DELETE CASCADE,
	FOREIGN KEY (supervisor_officialID) REFERENCES Official(officialID) ON DELETE RESTRICT,
	FOREIGN KEY (writer_officialID) REFERENCES Official(officialID) ON DELETE RESTRICT);

CREATE TABLE ParticipatesIn (
	tournamentID INTEGER NOT NULL,
	teamNumber INTEGER NOT NULL,
	division ENUM('A', 'B', 'C') NOT NULL,
	eventName VARCHAR(50) NOT NULL,
	scoreCode ENUM('participated', 'NS', 'DQ', 'P'), -- NS = No Show, DQ = Disqualified
	score FLOAT(24),
	tiebreak FLOAT(24),
	tier INTEGER,
	place INTEGER,
	PRIMARY KEY (tournamentID, teamNumber, division, eventName),
	FOREIGN KEY (tournamentID, teamNumber, division) REFERENCES Team(tournamentID, teamNumber, division) ON DELETE CASCADE,
	FOREIGN KEY (eventName, division) REFERENCES Event(eventName, division) ON DELETE CASCADE,
	FOREIGN KEY (tournamentID, eventName, division) REFERENCES ConsistsOf(tournamentID, eventName, division) ON DELETE CASCADE);
	
CREATE VIEW officialEventInfo AS (
	SELECT tournamentName, tournamentID, eventName, division, writer_officialID, supervisor_officialID
	FROM ((Tournament NATURAL JOIN ConsistsOf) INNER JOIN Official ON Official.officialID=ConsistsOf.supervisor_officialID));
	
CREATE VIEW coachedTeamInfo AS (
	SELECT tournamentName, tournamentID, teamName, division, teamNumber, school, state, officialID
	FROM Tournament NATURAL JOIN Team NATURAL JOIN CoachedBy);