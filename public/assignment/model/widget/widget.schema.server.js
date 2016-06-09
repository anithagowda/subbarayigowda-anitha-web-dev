/**
 * Created by asubbarayigowda on 6/6/16.
 */
module.exports = function () {
  
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
        widgetType: {type: String, enum : ["HEADER", "LABEL", "HTML", "TEXT", "LINK", "BUTTON", "IMAGE", "YOUTUBE", "DATATABLE", "REPEATER"]},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: String,
        class: String,
        icon: String,
        deletable: String,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.widget"});
    
    return WidgetSchema;
};