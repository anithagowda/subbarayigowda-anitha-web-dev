/**
 * Created by asubbarayigowda on 6/6/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var ProjUserSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        grocery: Array,
        followers: Array,
        following: Array,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.user"});
    
    return ProjUserSchema;
};