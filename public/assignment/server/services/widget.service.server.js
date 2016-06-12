/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app, module) {
    /*  Handle Image upload  */

    //multer for parsing file - adds a body object and a file or files object to the request object
    var multer = require('multer');
    var upload = multer({dest: __dirname+'/../../uploads'});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", reorderWidget);

    //There is a file attached which will be called 'myFile' which should go to dest folder
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgetModel = module.widgetModel;

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        
        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    console.log("updateWidget: "+err);
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.start;
        var end = req.query.end;

        widgetModel
            .reorderWidget(pageId, start, end)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            )
    }


    //req.file holds 'myFile', req.body holds form values
    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;
        var myFile = req.file;

        if (myFile == null) {
            return;
        }

        var originalName = myFile.originalname;
        var filename = myFile.filename; //multer assigns a unique name
        var path = myFile.path;
        var destination = myFile.destination;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        console.log(widgetId);
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    widget.url = "../uploads/" + filename;
                    delete widget._id;
                    console.log("After deleting id: " +widget);
                    var newWidget  = {"widgetType": "IMAGE", "name":widget.name, "text":widget.text, "url": "../uploads/" + filename, "width":widget.width};
                    console.log("Cloned widget: " +newWidget);
                    widgetModel
                        .updateWidget(widgetId, newWidget)
                        .then(
                            function (stat) {
                                res.redirect("/assignment/client/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+widgetId);
                                res.sendStatus(200);
                            },
                            function (err) {
                                console.log("updateWidget : "+err);
                                res.sendStatus(400).send(err);
                            }
                        );
                },
                function (err) {
                    console.log("findWidgetById : "+err);
                    res.sendStatus(400).send(err);
                }
            );
    }
};
