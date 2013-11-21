cs4750-project
==============

This is a Node.JS web application currently in development which will provide a simple way to integrate the scoring of events and presentation of awards managed in realtime. The application stack uses AngularJS in the browser, Node.JS with Express in the server and a MySQL datastore.

Getting Started
--------------

Get started by cloning the repository onto your file system. Make sure that you have [Node.JS](http://nodejs.org/) installed on your system. You can test this by running `which node`, which should return the path to node on your system if installed.

Once the repository has been cloned, navigate to your project directory in the shell and run `npm install`. This will add all of the packages required by this project. As dependencies are added to the project, you will need to re-run `npm install` to update your packages.

MySQL Configuration
-------------

For security reasons, the MySQL configuration information used for this project is not included in this repository. In order to add your connection information, create a `config.json` file in the project root with the following structure:

*config.json*

```
{
	"host": "yourHostname",
	"user": "yourUser",
	"password": "yourPassword",
	"database": "yourDatabaseName"
}
```

If you want to create a new database that is compatible with this application, simply run the SQL commands located in `sql/schema.sql` on your database. This should leave you with an empty database that contains the appropriate schema for this application. To populate the database with some sample data, run the commands in `sql/populate.sql`.

Using Grunt
-----------

In order to better handle scaling in the client side application, this application uses [Grunt](http://gruntjs.com) to build the various JavaScript files into a single file that is served to the web browser. Grunt must be running for this to work properly.

To install Grunt, open up the shell and run

```
npm install -g grunt-cli
```

Now, navigate to the root directory of this repository in the shell and enter

```
grunt
```

This will set up Grunt to automatically do a few things. First, it will start Compass and the node.js server. Next, it will watch for changes in the repository and recompile the client application JavaScript files whenever it is needed. It will also watch for changes the server JavaScript and rerun the server process when necessary. This command should be left running whenever you are editing files in the repository or running the server.

Running the Server
------------

To run the application server, you simply need to run `grunt` as mentioned earlier. Once you get a notification *Server is Running*, open up a web browser and navigate to `127.0.0.1:8080` to view the application. If you are not developing locally, replace `127.0.0.1` with your hostname.

Using Compass
----------

All of the styles for this project are written in scss compiled into css using [Compass](http://compass-style.org/). In order to compile the styles for this project, you must have Compass installed. If you don't already have it installed, run `gem install compass`. Once that is done, simply open a new tab in the terminal, navigate to the project root. When you run the `grunt` command, compass will start polling for changes and automatically compile the styles when a change is detected.