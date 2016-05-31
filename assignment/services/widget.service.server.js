/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {

    }

    function findAllWidgetsForPage(req, res) {

    }

    function findWidgetById(req, res) {

    }

    function updateWidget(req, res) {

    }

    function deleteWidget(req, res) {
        
    }
};
