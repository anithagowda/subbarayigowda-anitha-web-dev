/**
 * Created by asubbarayigowda on 6/9/16.
 */
(function () {

    angular
        .module("OnlineKitchen")
        .factory("FollowersService", FollowersService);

    function FollowersService($http) {

        var apis = {
            createFollower : createFollower,
            findFollowersByUserId : findFollowersByUserId,
            findFollowerById : findFollowerById,
            updateFollower : updateFollower,
            deleteFollowerById : deleteFollowerById,
            deleteFollowerByName : deleteFollowerByName
        };


        function createFollower(userId, follower) {
            var newFollower = {"_user": userId, "follower": follower};
            var url = "/api/user/"+userId+"/follower";
            return $http.post(url, newFollower);
        }

        function findFollowersByUserId(userId) {
            var url = "/api/user/"+userId+"/follower";
            return $http.get(url);
        }

        function findFollowerById(followerId) {
            var url = "/api/follower/"+followerId;
            return $http.get(url);
        }

        function updateFollower(followerId, follower) {
            var url = "/api/follower/"+followerId;
            return $http.put(url, follower);
        }

        function deleteFollowerById(followerId) {
            var url = "/api/follower/?id="+followerId;
            return $http.delete(url);
        }
        
        function deleteFollowerByName(followerName) {
            var url = "/api/follower/?name="+followerName;
            return $http.delete(url);
        }

        return apis;

    }
})();