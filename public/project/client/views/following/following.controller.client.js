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
            $(".select_input").val("");
            FollowingsService
                .findFollowingsByUserId($routeParams.uid)
                .then(
                    function (res) {
                        vm.followings = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve your followings. Please try again later";
                        $('#launch_model').modal('show');
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

                        for (var j in users) {
                            if (users[j].username === 'admin') {
                                users.splice(j,1);
                            }
                        }
                        vm.users = users;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve Users. Please try again later";
                        $('#launch_model').modal('show');
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
                        $('#launch_model').modal('show');
                        init();
                    },
                    function (err) {
                        vm.error = "Failed to follow User. Please try again later";
                        $('#launch_model').modal('show');
                    });

            FollowersService
                .createFollower(following._id, user)
                .then(
                    function (follower) {
                        vm.success = "Success!";
                        $('#launch_model').modal('show');
                    },
                    function (err) {
                        vm.error = "Failed to follow User. Please try again later";
                        $('#launch_model').modal('show');
                    });

            init();
        }

        function unFollowUser(following) {
            FollowingsService
                .deleteFollowingById(following._id)
                .then(
                    function (stat) {
                        vm.success = "Unfollowed!";
                        $('#launch_model').modal('show');
                        
                        FollowersService
                            .deleteFollowerByName(user.username)
                            .then(
                                function (stat) {
                                    //vm.success = "Unfollowed!";
                                    init();
                                },
                                function (err) {
                                    vm.error = "Failed to unfollow. Please try again later";
                                    $('#launch_model').modal('show');
                                }
                            );
                    },
                    function (err) {
                        vm.error = "Failed to unfollow. Please try again later";
                        $('#launch_model').modal('show');
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