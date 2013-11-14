`sql/` Directory
==============

This directory contains generic SQL files that can be run on the application's database. Specifically, `schema.sql` will create the tables with all of the appropriate dependencies to run the application on your database. `populate.sql` provides some SQL statements that will insert sample data for the database.

Connecting to MySQL
------------

This directory also contains `connection.js`, which will set up a connection to the database and return an object that you can use to interface with the database. This object is the connection object as defined by the [node-mysql](https://github.com/felixge/node-mysql) package.

This file will typically be included in model files. In order to include the conneciton file in those files, include the following line at the top of the model file.

```
var connection = require('../sql/connection');
```

The `connection` variable will now hold the information described above.