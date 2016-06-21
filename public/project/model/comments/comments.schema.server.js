/**
 * Created by asubbarayigowda on 6/20/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var ProjCommentsSchema = mongoose.Schema({
        "_user": {type: mongoose.Schema.ObjectId, ref: "ProjectUser"},
        "recipeId": String,
        "username": String,
        "comment": String,
        "dateCreated": {type: Date, default: Date.now()}
    }, {collection: "project.comments"});

    return ProjCommentsSchema;
};