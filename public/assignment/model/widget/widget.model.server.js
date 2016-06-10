/**
 * Created by asubbarayigowda on 6/6/16.
 */
module.exports = function () {
  
    var mongoose = require("mongoose");
//    var autoIncrement = require('mongoose-auto-increment');

    var WidgetSchema = require("./widget.schema.server")();
//    WidgetSchema.plugin(autoIncrement.plugin, {model: 'Widget', field: 'order'});
    var Widget = mongoose.model("Widget", WidgetSchema);

    var apis = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return apis;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return Widget.update({_id: widgetId}, {$set: widget});
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
    
    function reorderWidget(pageId, start, end) {
        var startNum = parseInt(start);
        var endNum = parseInt(end);

        //iterate through all the widgets in DB
        Widget.find(function (err, widgets) {
            widgets.forEach(function (widget) {
                //this widget has reference to DB object. any change done to this obj will reflect in db change
                if (startNum > endNum) {
                    if(widget.order >= endNum && widget.order < startNum) {
                        widget.order++;
                        widget.save(function () {}); // save requires a function as a parameter even if we dont need it
                    }
                    else if (widget.order === startNum) {
                        widget.order = endNum;
                        widget.save(function () {});
                    }
                }
                else {
                    if(widget.order > startNum && widget.order <= endNum) {
                        widget.order--;
                        widget.save(function () {});
                    }
                    else if (widget.order === startNum) {
                        widget.order = endNum;
                        widget.save(function () {});
                    }
                }
            });
        });
        return findAllWidgetsForPage(pageId);
    }
};