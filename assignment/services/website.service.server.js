/**
 * Created by asubbarayigowda on 5/30/16.
 */
module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        
    }
    
    function findAllWebsitesForUser(req, res) {
        
    }
    
    function findWebsiteById(req, res) {
        
    }
    
    function updateWebsite(req, res) {
        
    }
    
    function deleteWebsite(req, res) {
        
    }
};