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
            deleteFollowingById : deleteFollowingById,
            deleteFollowingByName : deleteFollowingByName
        };


        function createFollowing(userId, following) {
            var newFollowing = {"_user": userId, "following": following};
            var url = "/api/user/"+userId+"/following";
            return $http.post(url, newFollowing);
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

        function deleteFollowingById(followingId) {
            var url = "/api/following/?id="+followingId;
            return $http.delete(url);
        }
        
        function deleteFollowingByName(followingName) {
            var url = "/api/following/?name="+followingName;
            return $http.delete(url);
        }

        return apis;

    }
})();