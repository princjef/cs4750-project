`app/scss` Directory
===============

This directory contains the `.scss` files that are compiled into `.css` files used by the application using [Compass](http://compass-style.org/). The SCSS syntax is a superset of standard CSS, so if you do not know SCSS or are not comfortable with it's special commands, you can simply write plain CSS and it will work as expected.

Using Compass
-----------

In order to use the styles in this folder, they must first be compiled into CSS files. This can be done automatically using the Compass project already embedded in this application. If you do not have Compass already installed, simply run `gem install compass` in your shell. Compasss is written in Ruby, so you will need to have Ruby installed if you do not already. Once you're ready to start editing these files, open a new window in your terminal, navigate to the root directory of this repository and run `compass watch`.

Compass will start monitoring this directory for changes to any of these files and automatically compile them down to the corresponding CSS files located in the `app/css` directory

File Naming
----------

Compass follows a convention whereby any files in this directory with a name starting with an underscore character will not be compiled into its own CSS file. This is useful because it is best to serve fewer stylesheets to the browser if possible, so we can simply tell compass to combine all of the component stylesheets into a few larger stylesheets that will actually be requested by the application. These files will not have underscores, so that they can be compiled into standalone CSS files.