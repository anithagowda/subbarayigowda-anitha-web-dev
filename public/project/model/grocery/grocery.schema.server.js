/**
 * Created by asubbarayigowda on 6/14/16.
 */
module.exports = function () {
  
    var mongoose = require("mongoose");
    
    var GrocerySchema = mongoose.Schema({
        "_user" : {type:mongoose.Schema.ObjectId, ref: "ProjUser"},
        "name" : String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.grocery" });
    
    return GrocerySchema;
};