`app/partials` Directory
====================

This directory contains all of the partial templates that are requested by the application front-end for certain pages. Each of these files corresponds to at least one route in the application's primary JavaScript file. The files are broken up by the type of route they serve (such as tournament routes, organization routes, user routes, etc.). Feel free to make new partial templates and wire them up in the application.

Connecting a Template File to an AngularJS Route
------------------

In order to serve a template file from this directory in the AngularJS application, it must be connected to some route (i.e. url). In order to do this, find the `app.config` function located in the `app.js` file and add a line inside of the following form:

```
$routeProvider.when('/some/route/here', {
	templateUrl: '/partials/my/template/file',
	controller: 'MyTemplateCtrl'
});
```

*NOTE: `.when()` function calls can be (and typically are) chained, such that the next call to `.when()` is simply tacked on to the end of the previous one. This is how routes are currently implemented in the application.*