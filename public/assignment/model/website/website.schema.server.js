/**
 * Created by asubbarayigowda on 6/6/16.
 */

module.exports = function () {
    
    var mongoose = require("mongoose");
    
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref:"User"}, //_ is used to identify the unique identifier pointing to parent
        name: {type: String, required: true, unique: true},
        description: String,
        pages: [{type: mongoose.Schema.ObjectId, ref:"Page"}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.website"});
    
    return WebsiteSchema;
};