/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var apis = {
            "createWebsite" : "createWebsite",
            "findWebsitesByUser" : "findWebsitesByUser",
            "findWebsiteById" : "findWebsiteById",
            "updateWebsite" : "updateWebsite",
            "deleteWebsite" : "deleteWebsite"
        };

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        function createWebsite(userId, website) {
            var newWebsite = { "_id": "111", "name": website.name, "developerId": userId};
            websites.push(newWebsite);
        }
        
        function findWebsitesByUser(userId) {
            var website;
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    website = websites[i];
                }
            }
        }
        
        function findWebsiteById(websiteId) {
            var website;
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    website = websites[i];
                }
            }
        }
        
        function updateWebsite(websiteId, website) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                }
            }
        }
        
    }

})();
