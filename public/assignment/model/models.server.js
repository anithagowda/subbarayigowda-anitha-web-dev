/**
 * Created by asubbarayigowda on 6/7/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');

    var url = 'mongodb://localhost/webdev_assignment';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        url = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var connect = function () {
        console.log(url);
        mongoose.connect(url);
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