/**
 * Created by asubbarayigowda on 5/31/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var key = "91d2ce699f5583eb5f29d3d52e357492";
        var secret = "44a6aae5b5be8e27";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var apis = {
            searchPhotos : searchPhotos
        };

        function searchPhotos(searchText) {
            console.log("Server " + searchText);
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }

        return apis;
    }
})();