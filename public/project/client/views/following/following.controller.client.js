/**
 * Created by asubbarayigowda on 6/9/16.
 */
(function () {

    angular
        .module("OnlineKitchen")
        .controller("FollowingsController", FollowingsController);

    function FollowingsController($routeParams, FollowingsService, UserService, FollowersService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        var user = null;
        vm.selectFollowing = selectFollowing;
        vm.searchUsers = searchUsers;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;

        function init() {
            FollowingsService
                .findFollowingsByUserId($routeParams.uid)
                .then(
                    function (res) {
                        vm.followings = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve your followings.."
                    }
                );
            vm.users = null;

            UserService
                .findUserById($routeParams.uid)
                .then(
                    function (res) {
                        user = res.data;
                    }
                );


        }
        init();

        function selectFollowing(following) {
            //Go to followers profile
        }
        
        function searchUsers(username) {
            UserService
                .findUserStartingWithUsername(username)
                .then(
                    function (res) {
                        vm.users = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve Users..";
                    });
        }

        function followUser(following) {
            FollowingsService
                .createFollowing($routeParams.uid, following)
                .then(
                    function (following) {
                        vm.success = "Success!";
                        init();
                    },
                    function (err) {
                        vm.error = "Failed to follow User..";
                    });

            FollowersService
                .createFollower(following._id, user)
                .then(
                    function (follower) {
                        vm.success = "Success!";
                    },
                    function (err) {
                        vm.error = "Failed to follow User..";
                    });
        }

        function unFollowUser(following) {
            FollowingsService
                .deleteFollowingById(following._id)
                .then(
                    function (stat) {
                        vm.success = "Unfollowed!";

                        FollowersService
                            .deleteFollowerByName(user.username)
                            .then(
                                function (stat) {
                                    vm.success = "Unfollowed!";
                                    init();
                                },
                                function (err) {
                                    vm.error = "Failed to unfollow"
                                }
                            );
                    },
                    function (err) {
                        vm.error = "Failed to unfollow"
                    }
                )
        }
    }
})();