/**
 * Created by asubbarayigowda on 6/9/16.
 */
module.exports = function () {
    
    var mongoose = require("mongoose");
    var followerUserSchema = require("./../user/user.schema.server")();

    var ProjFollowersSchema = mongoose.Schema({
        "_user": {type: mongoose.Schema.ObjectId, ref: "ProjectUser"},
        "follower" : followerUserSchema,
        "dateCreated": {type: Date, default: Date.now()}
    }, {collection: "project.followers"});
    
    return ProjFollowersSchema;
};