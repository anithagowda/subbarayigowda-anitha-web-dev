/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var apis = {
            "createWidget" : "createWidget",
            "findWidgetsByPageId" : "findWidgetsByPageId",
            "findWidgetById" : "findWidgetById",
            "updateWidget" : "updateWidget",
            "deleteWidget" : "deleteWidget"
        };

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        
        function createWidget(pageId, widget) {
            var newWidget;
            if (widget.widgetType === "HEADER") {
                newWidget = { "_id": "111", "widgetType": "HEADER", "pageId": pageId, "size": widget.size, "text": widget.text};
            }
            else if (widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") {
                newWidget = { "_id": "111", "widgetType": widget.widgetType, "pageId": pageId, "width": widget.width, "url": widget.url};
            }
            else if (widget.widgetType === "HTML") {
                newWidget = { "_id": "111", "widgetType": "HTML", "pageId": pageId, "text": widget.text};
            }
            widgets.push(newWidget);
        }
        
        function findWidgetsByPageId(pageId) {
            for (var i in widgets) {
                if (widgets[i].pageId === pageId) {
                    return widgets[i];
                }
            }
        }
        
        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
        }
        
        function updateWidget(widgetId, widget) {
            var oldwidget;
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    oldwidget = widgets[i];
                }
            }

            if (widget.widgetType === "HEADER") {
                oldwidget.pageId = widget.pageId;
                oldwidget.size = widget.size;
                oldwidget.text = widget.text;
            }
            else if (widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") {
                oldwidget.pageId = widget.pageId;
                oldwidget.width = widget.width;
                oldwidget.url = widget.url;
            }
            else if (widget.widgetType === "HTML") {
                oldwidget.pageId = widget.pageId;
                oldwidget.text = widget.text;
            }
        }

        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return;
                }
            }
        }
    }

})();