/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .factory("FavouritesService", FavouritesService);

    function FavouritesService($http) {

        var apis = {
            createFavourite : createFavourite,
            findFavouritesByUserId : findFavouritesByUserId,
            findFavouriteById : findFavouriteById,
            updateFavourite : updateFavourite,
            deleteFavourite : deleteFavourite
        };


        function createFavourite(userId, favourite) {
            favourite._user = userId;
            var url = "/api/user/"+userId+"/favourite";
            return $http.post(url, favourite);
        }

        function findFavouritesByUserId(userId) {
            var url = "/api/user/"+userId+"/favourite";
            return $http.get(url);
        }

        function findFavouriteById(favouriteId) {
            var url = "/api/favourite/"+favouriteId;
            return $http.get(url);
        }

        function updateFavourite(favouriteId, favourite) {
            var url = "/api/favourite/"+favouriteId;
            return $http.put(url, favourite);
        }

        function deleteFavourite(favouriteId) {
            var url = "/api/favourite/"+favouriteId;
            return $http.delete(url);
        }

        return apis;
    }
})();
