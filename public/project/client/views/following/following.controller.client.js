/**
 * Created by asubbarayigowda on 6/9/16.
 */
(function () {

    angular
        .module("OnlineKitchen")
        .controller("FollowingsController", FollowingsController);

    function FollowingsController($routeParams, FollowingsService, UserService, FollowersService, $rootScope, $location) {
        var vm = this;

        vm.uid = $routeParams.uid;
        var user = null;
        vm.handleSearchToggle = handleSearchToggle;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;
        vm.logout = logout;
        vm.home = home;

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

            $(".followings").show();
            $(".users_search").hide();
        }

        function initSearchToggle() {
            $("#search_toggle").click(function () {
                $(this).find('span').toggleClass('glyphicon-search').toggleClass('glyphicon-remove');
            });
        }
        init();
        initSearchToggle();


        function handleSearchToggle(username) {
            //glyphicon is already changed to remove before taking action for search
            if ($("#search_toggle").find('span').hasClass('glyphicon-remove'))   {
                searchUsers(username);
            }
            else {
                $(".clear_search").val("");
                init();
            }
        }

        function searchUsers(username) {
            UserService
                .findUserStartingWithUsername(username)
                .then(
                    function (res) {
                        var users = res.data;
                        for (var i in users) {
                            if (isInArray(users[i], vm.followings)) {
                                users.splice(i,1);
                            }
                        }
                        vm.users = users;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve Users..";
                    });

            $(".followings").hide();
            $(".users_search").show();
        }

        function isInArray(value, array) {
            for (var i in array) {
                if (array[i].following._id === value._id) {
                    return true;
                }
            }
            return false;
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

            init();
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

        function home() {
            if($rootScope.currentUser.username === 'admin') {
                $location.url("/admin/"+vm.uid);
            }
            else {
                $location.url("/user");
            }
        }
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (res) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function (err) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );

        }
    }
})();