/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var apis = {
            createWebsite : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };



        function createWebsite(userId, website) {
            var id = new Date().getTime().toString();
            var newWebsite = { "_id": id, "name": website.name, "developerId": userId};
            websites.push(newWebsite);
        }
        
        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }
        
        function findWebsiteById(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
        }
        
        function updateWebsite(websiteId, website) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    return;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var i in websites) {
                if (websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return;
                }
            }
        }

        return apis;

    }


})();
