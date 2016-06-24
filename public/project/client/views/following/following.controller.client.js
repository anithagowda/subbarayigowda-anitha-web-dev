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
        vm.searchString = '';
        var user = null;

        vm.searchUserWithName = searchUserWithName;
        vm.followUser = followUser;
        vm.unFollowUser = unFollowUser;
        vm.searchRecipeWithIngredient = searchRecipeWithIngredient;
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
        init();

        function searchUserWithName(searchStr) {
            if(searchStr === '') {
                $(".select_input").val("");
                init();
            }
            else {
                searchUsers(searchStr);    
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


        function searchRecipeWithIngredient(ingredient) {
            $location.url("/user/"+vm.uid+"/search/"+ingredient);
        }

        function home() {
            if($rootScope.currentUser.username === 'admin') {
                $location.url("/admin/"+vm.uid);
            }
            else {
                $location.url("/user/"+vm.uid+"/grocery");
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