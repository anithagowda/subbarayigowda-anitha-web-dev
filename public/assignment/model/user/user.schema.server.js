/**
 * Created by asubbarayigowda on 6/6/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        dob : Date,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.user"});
    
    return UserSchema;
};