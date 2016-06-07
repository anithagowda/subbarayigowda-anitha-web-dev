/**
 * Created by asubbarayigowda on 6/7/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs5610WebAppMaker');

    var models = {
        userModel: require("./user/user.model.server")()
    };
    return models;
};