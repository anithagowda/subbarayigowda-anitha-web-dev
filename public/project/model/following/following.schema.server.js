/**
 * Created by asubbarayigowda on 6/9/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var followingUserSchema = require("./../user/user.schema.server")();
    
    var ProjFollowingSchema = mongoose.Schema({
        "_user": {type: mongoose.Schema.ObjectId, ref: "ProjectUser"},
        "following" : followingUserSchema,
        "dateCreated": {type: Date, default: Date.now()}
    }, {collection: "project.following"});

    return ProjFollowingSchema;
};