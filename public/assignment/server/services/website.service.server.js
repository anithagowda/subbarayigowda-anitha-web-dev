/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app, module) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var WebsiteModule = module.websiteModel;
    
    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;

        WebsiteModule
            .createWebsite(userId, website)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
    
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        WebsiteModule
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (err) {
                    res.sendStatus(404);
                }
            );
    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModule
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
    
    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        WebsiteModule
            .updateWebsite(websiteId, website)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
    
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModule
            .deleteWebsite(websiteId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
};