/**
 * Created by asubbarayigowda on 5/31/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var key = "your-flickr-key";
        var secret = "your-flickr-secret";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var apis = {
            searchPhotos : searchPhotos
        };

        function searchPhotos(searchText) {
            console.log("Server " + searchText);
            // var url = urlBase
            //     .replace("API_KEY", key)
            //     .replace("TEXT", searchText);
            // return $http.get(url);
        }

        return apis;
    }
})();