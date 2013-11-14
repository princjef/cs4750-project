`routes/` Directory
===============

This directory holds files which manage the server behavior for routes that do not serve static files. Each file deals with a certain group of routes, providing an `exports` function for each route, which can simply be invoked in the server file.

Adding a Route
------------

When you want to create a new route in one of these files (or in a new one), simply add an `exports` function that provides a handler for the route. These will follow the form shown below. The `res` and `req` parameters represent the request and response objects as defined in the [Express API](http://expressjs.com/api.html).

```
exports.myHandler = function(req, res) {
	// Some database interfacing and response will go in here
};
```

Now, you simply need to call this function in the server file for the appropriate route. For instance,

```
app.get('/some/path/here', myRouteFile.myHandler);
```

Note that in order for this to work, the route file must be included in the server file using the `require()` function of Node.JS.

```
var myRouteFile = require('path/to/routeFile');
```