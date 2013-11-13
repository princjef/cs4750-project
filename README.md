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

If you want to create a new database that is compatible with this application, simply run the SQL commands located in `sql/schema.sql` on your database. This should leave you with an empty database that contains the appropriate schema for this application.

Running the Server
------------

To run the application server, simply navigate to the project root in the shell and type `node server.js`. When you get the message *Listening on port 8080* in the terminal, you're ready to go. Open up a web browser and navigate to `127.0.0.1:8080` to view the application. If you are not developing locally, replace `127.0.0.1` with your hostname.