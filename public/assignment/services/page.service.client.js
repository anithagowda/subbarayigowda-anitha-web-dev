/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var apis = {
            "createPage" : "createPage",
            "findPageByWebsiteId" : "findPageByWebsiteId",
            "findPageById" : "findPageById",
            "updatePage" : "updatePage",
            "deletePage" : "deletePage"
        };

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];
        
        function createPage(websiteId, page) {
            var newPage = { "_id":"111", "name":page.name, "websiteId":websiteId};
            pages.push(newPage);
        }
        
        function findPageByWebsiteId(websiteId) {
            for(var i in pages) {
                if (pages[i].websiteId === websiteId) {
                    return pages[i];
                }
            }
        }
        
        function findPageById(pageId) {
            for(var i in pages) {
                if (pages[i]._id === pageId) {
                    return pages[i];
                }
            }
        }
        
        function updatePage(pageId, page) {
            for(var i in pages) {
                if (pages[i]._id === pageId) {
                    pages[i].name = page.name;
                    pages[i].websiteId = page.websiteId;
                    return;
                }
            }
        }
        
        function deletePage(pageId) {
            for(var i in pages) {
                if (pages[i]._id === pageId) {
                    pages.splice(i,1);
                    return;
                }
            }
        }
    }

})();