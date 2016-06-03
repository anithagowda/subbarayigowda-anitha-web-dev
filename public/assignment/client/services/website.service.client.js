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
            var newWebsite = { "name": website.name, "developerId": userId};
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, newWebsite);
        }
        
        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }
        
        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }
        
        function updateWebsite(websiteId, website) {
            var url = "/api/website/"+websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.delete(url);
        }

        return apis;

    }


})();
