/**
 * Created by asubbarayigowda on 6/8/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var ProjFavouritesSchema = mongoose.Schema({
        "_user": {type: mongoose.Schema.ObjectId, ref: "ProjectUser"},
        "_comment": {type: mongoose.Schema.ObjectId, ref: "ProjectComments"},
        "title": String,
        "source_url": String,
        "image_url": String,
        "recipe_id": String,
        "dateCreated": {type: Date, default: Date.now()}
    }, {collection: "project.favourites"});
    
    return ProjFavouritesSchema;
};