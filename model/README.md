`model/` Directory
===============

This directory holds data/interaction models for each object represented in the database. Each model may include the following:

 * Public fields that store properties of that model
 * Instance functions which get or save instances of that model
 * Static functions which get information not related to any one instance of the model

Using Models
------------

In order to include a model for use in another file, simply include the following line at the top of the file. Note that the path may omit the `.js` extension of the model if desired:

```
var MyModel = require('/path/to/MyModel');
```

Now, the `MyModel` model can be manipulated in the following ways:

```
// Create an instance of the model
var myModelInstance = new MyModel(params);

// Access a public field of that instance
var field = myModelInstance.someField;

// Invoke a public function of that instance (typically uses callback function)
myModelInstance.someFunction(callbackFunction);

// Invoke a static function of the model (also typically uses a callback function)
MyModel.staticFunction(callbackFunction);
```