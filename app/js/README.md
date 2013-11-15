`app/js` Directory
===============

This directory has all of the JavaScript files used in the application front-end, including the `main.js` file, which is the root for the AngularJS application. All other files making up the application are located in subdirectories according to their function.

`app.js`
----------

The `app.js` file is not the same as the rest of the files in this directory. It is compiled from the other files using Grunt and is served to the browser as a single file, rather than the browser having to request all of the files in this folder. Under no circumstances should this file be edited directly.