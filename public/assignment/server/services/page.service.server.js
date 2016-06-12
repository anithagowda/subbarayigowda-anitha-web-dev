/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app, module) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var PageModel = module.pageModel;

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;

        PageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        PageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        PageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;

        PageModel
            .updatePage(pageId, page)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        PageModel
            .deletePage(pageId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
};