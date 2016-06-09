/**
 * Created by asubbarayigowda on 6/7/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/cs5610WebAppMaker');


    var connect = function () {
        mongoose.connect('mongodb://localhost/cs5610WebAppMaker');
    };
    connect();

    var db = mongoose.connection;

    db.on('error', function(error){
        console.log("Error loading the db - "+ error);
    });

    db.on('disconnected', connect);
    
    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };
    return models;
};