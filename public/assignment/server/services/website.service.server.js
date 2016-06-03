/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];
    
    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;

        var id = new Date().getTime().toString();
        var newWebsite = { "_id": id, "name": website.name, "developerId": userId};
        websites.push(newWebsite);

        res.send(newWebsite);
    }
    
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var matchedWebsites = [];
        for (var i in websites) {
            if (websites[i].developerId === userId) {
                matchedWebsites.push(websites[i]);
            }
        }
        res.json(matchedWebsites);
    }
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                res.json(websites[i]);
                return;
            }
        }
        res.sendStatus(400);
    }
    
    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites[i].name = website.name;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
    
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
};