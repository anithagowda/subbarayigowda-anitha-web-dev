/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Lorem ipsum html</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum html</p>"}
    ];
    
    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        
        var id = new Date().getTime().toString();
        var newWidget;
        if (widget.widgetType === "HEADER") {
            newWidget = { "_id": id, "widgetType": "HEADER", "pageId": pageId, "size": widget.size, "text": widget.text};
        }
        else if (widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") {
            newWidget = { "_id": id, "widgetType": widget.widgetType, "pageId": pageId, "width": widget.width, "url": widget.url};
        }
        else if (widget.widgetType === "HTML") {
            newWidget = { "_id": id, "widgetType": "HTML", "pageId": pageId, "text": widget.text};
        }
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var matchedWidget = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageId) {
                matchedWidget.push(widgets[i]);
            }
        }
        res.json(matchedWidget);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        
        var oldwidget;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                oldwidget = widgets[i];
                update(oldwidget, widget);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
    
    function update(oldwidget, widget) {
        if (widget.widgetType === "HEADER") {
            oldwidget.size = widget.size;
            oldwidget.text = widget.text;
        }
        else if (widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") {
            oldwidget.width = widget.width;
            oldwidget.url = widget.url;
        }
        else if (widget.widgetType === "HTML") {
            oldwidget.text = widget.text;
        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
};
