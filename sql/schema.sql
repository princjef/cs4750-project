CREATE TABLE Account (
	username VARCHAR(50) NOT NULL,
	email VARCHAR(100),
	password VARCHAR(50) NOT NULL,
	PRIMARY KEY (username));

CREATE TABLE Organization (
	orgID INTEGER NOT NULL AUTO_INCREMENT,
	orgName VARCHAR(100) NOT NULL,
	PRIMARY KEY (orgID));

CREATE TABLE Tournament (
	tournamentID INTEGER NOT NULL AUTO_INCREMENT,
	tournamentType ENUM('Invitational, Regional, State, National, Other') NOT NULL,
	location VARCHAR(100),
	tournamentDate DATE,
	PRIMARY KEY (tournamentID));

CREATE TABLE Official (
	officialID INTEGER NOT NULL AUTO_INCREMENT,
	name_first VARCHAR(30) NOT NULL,
	name_last VARCHAR(50) NOT NULL,
	email VARCHAR(100),
	phone INTEGER(10),
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

CREATE TABLE ParticipatesIn (
	tournamentID INTEGER NOT NULL,
	teamNumber INTEGER NOT NULL,
	division ENUM('A', 'B', 'C') NOT NULL,
	eventName VARCHAR(50) NOT NULL,
	scoreCode ENUM('participated', 'NS', 'DQ'), -- NS = No Show, DQ = Disqualified
	score FLOAT(24),
	tiebreak FLOAT(24),
	tier ENUM('1', '2', '3', '4'),
	PRIMARY KEY (tournamentID, teamNumber, division, eventName),
	FOREIGN KEY (tournamentID, teamNumber, division) REFERENCES Team(tournamentID, teamNumber, division) ON DELETE CASCADE,
	FOREIGN KEY (eventName) REFERENCES Event(eventName) ON DELETE CASCADE);

CREATE TABLE ConsistsOf (
	tournamentID INTEGER NOT NULL,
	eventName VARCHAR(50) NOT NULL,
	supervisor_officialID INTEGER,
	writer_officialID INTEGER,
	eventType ENUM('Standard', 'Trial') NOT NULL DEFAULT 'Standard', -- Standard corresponds to normally scored events, while Trial corresponds to trial events
	scored BOOLEAN NOT NULL DEFAULT 0,
	highScoreWins BOOLEAN NOT NULL DEFAULT 1,
	highTiebreakWins BOOLEAN NOT NULL DEFAULT 1,
	PRIMARY KEY (tournamentID, eventName),
	FOREIGN KEY (tournamentID) REFERENCES Tournament(tournamentID) ON DELETE CASCADE,
	FOREIGN KEY (eventName) REFERENCES Event(eventName) ON DELETE CASCADE);