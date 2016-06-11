/**
 * Created by asubbarayigowda on 6/6/16.
 */
module.exports = function () {
  
    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server")();
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
        return Widget
            .findOne({"_page": pageId})
            .sort('-order')
            .then(
                function (endWidget) {
                    if (endWidget) {
                        widget.order = ++endWidget.order;
                    }
                    widget._page = pageId;
                    return Widget.create(widget);
                },
                function (err) {
                    console.log("Create error : "+err);
                }
            );

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
        Widget
            .find({'_page': pageId})
            .then(
                function (widgets) {
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
                },
                function (err) {
                    console.log("reorderWidget error:"+err);
                }
            );
        return findAllWidgetsForPage(pageId);
    }
};