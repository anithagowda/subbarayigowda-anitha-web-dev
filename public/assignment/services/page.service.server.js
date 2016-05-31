/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {

    }

    function findAllPagesForWebsite(req, res) {

    }

    function findPageById(req, res) {

    }

    function updatePage(req, res) {

    }

    function deletePage(req, res) {
        
    }
};