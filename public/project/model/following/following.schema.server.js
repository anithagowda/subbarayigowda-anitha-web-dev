/**
 * Created by asubbarayigowda on 6/9/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var ProjFollowingSchema = mongoose.Schema({
        "_user": {type: mongoose.Schema.ObjectId, ref: "ProjectUser"},
        "username" : String
    }, {collection: "project.following"});

    return ProjFollowingSchema;
};