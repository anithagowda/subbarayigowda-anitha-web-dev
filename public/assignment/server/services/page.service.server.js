/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];
    
    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        
        var id = new Date().getTime().toString();
        var newPage = {"_id":id, "name":page.name, "websiteId":websiteId};
        pages.push(newPage);
        res.json(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var foundPages = [];
        for(var i in pages) {
            if (pages[i].websiteId === websiteId) {
                foundPages.push(pages[i]);
            }
        }
        res.json(foundPages);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var i in pages) {
            if (pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for(var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = page.name;
                pages[i].websiteId = page.websiteId;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
};