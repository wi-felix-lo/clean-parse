var express = require('express');
var _ = require('underscore');

// Controller code in separate files.
var index = require('cloud/controllers/index.js');

// Required for initializing Express app in Cloud Code.
var app = express();

// We will use HTTP basic auth to protect some routes (e.g. adding a new blog
// post)
var basicAuth = express.basicAuth('felix', '123456');

// The information showed about the poster
var userEmail = 'felix.lo@wellintech.com.hk';
var userDisplayName = 'Felix Lo';
var userDescription = 'System Analyst';

// Instead of using basicAuth, you can also implement your own cookie-based
// user session management using the express.cookieSession middleware
// (not shown here).

// Global app configuration section
app.set('views', 'cloud/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
if (typeof __dirname !== 'undefined') app.use(express.static(__dirname + '/../public'));

// Note that we do not write app.use(basicAuth) here because we want some routes
// (e.g. display all blog posts) to be accessible to the public.

// testing
app.get('/', index.render);

// Required for initializing Express app in Cloud Code.
if (typeof process.env === 'undefined') {
    app.listen();
} else {
    app.listen(process.env.PORT);
}
