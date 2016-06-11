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
        email: String,
        phone: String,
        dob : Date,
        websites: [{type:mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.user"});
    
    return UserSchema;
};