/**
 * Created by asubbarayigowda on 6/8/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var ProjFavouritesSchema = mongoose.Schema({
        "_user": {type: mongoose.Schema.ObjectId, ref: "ProjectUser"},
        "title": String,
        "source_url": String,
        "image_url": String
    }, {collection: "project.favourites"});
    
    return ProjFavouritesSchema;
};