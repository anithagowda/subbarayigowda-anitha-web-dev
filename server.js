var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// configure server
//load module
var assignment = require("./public/assignment/server/app.js");
//call module
assignment(app);

//Configure project server
var request = require('request');
require("./public/project/server/app.js")(app, request);

app.listen(port, ipaddress);
