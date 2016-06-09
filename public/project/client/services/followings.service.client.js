/**
 * Created by asubbarayigowda on 6/9/16.
 */
(function () {

    angular
        .module("OnlineKitchen")
        .factory("FollowingsService", FollowingsService);

    function FollowingsService($http) {

        var apis = {
            createFollowing : createFollowing,
            findFollowingsByUserId : findFollowingsByUserId,
            findFollowingById : findFollowingById,
            updateFollowing : updateFollowing,
            deleteFollowing : deleteFollowing
        };


        function createFollowing(userId, following) {
            var url = "/api/user/"+userId+"/following";
            return $http.post(url, following);
        }

        function findFollowingsByUserId(userId) {
            var url = "/api/user/"+userId+"/following";
            return $http.get(url);
        }

        function findFollowingById(followingId) {
            var url = "/api/following/"+followingId;
            return $http.get(url);
        }

        function updateFollowing(followingId, following) {
            var url = "/api/following/"+followingId;
            return $http.put(url, following);
        }

        function deleteFollowing(followingId) {
            var url = "/api/following/"+followingId;
            return $http.delete(url);
        }

        return apis;

    }
})();