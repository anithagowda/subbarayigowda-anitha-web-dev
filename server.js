var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());// cookie needs to be loaded before session
//app.use(session({ secret: process.env.SESSION_SECRET })); //session configured to encrypt cookie using SESSION_SECRET(environment variable)
app.use(session({ secret: "sdfDcw" }));


var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session()); //should be placed after session is initialized(line:14)


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// configure server
//load module
require("./public/assignment/server/app.js")(app);

//Configure project server
var request = require('request');
//require("./public/project/server/app.js")(app, request);

app.listen(port, ipaddress);
