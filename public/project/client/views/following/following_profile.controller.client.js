/**
 * Created by asubbarayigowda on 6/10/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("FollowingProfileController", FollowingProfileController);
    
    function FollowingProfileController($routeParams, FollowingsService, FavouritesService, FollowersService, UserService, $rootScope, $location) {
        
        var vm = this;
        vm.uid = $routeParams.uid;
        var followingid = $routeParams.followingid;
        vm.selectRecipe = selectRecipe;
        vm.addFavourite = addFavourite;
        vm.logout = logout;
        vm.home = home;
        
        function init() {
            FollowingsService
                .findFollowingById(followingid)
                .then(
                    function (res) {
                        var following = res.data.following;

                        UserService
                            .findUserById(following._id)
                            .then(
                                function (res) {
                                    vm.user = res.data;
                                },
                                function (err) {
                                    vm.error = "Failed to retrieve Following User info";
                                    $('#launch_model').modal('show');
                                }
                            );

                        FavouritesService
                            .findFavouritesByUserId(following._id)
                            .then(
                                function (res) {
                                    vm.favourites = res.data;
                                },
                                function (err) {
                                    vm.error = "Failed to retrieve favourites for " + vm.user.username;
                                    $('#launch_model').modal('show');
                                }
                            );

                        FollowersService
                            .findFollowersByUserId(following._id)
                            .then(
                                function (res) {
                                    vm.followers = res.data;
                                },
                                function (err) {
                                    vm.error = "Failed to retrieve followers for " + vm.user.username;
                                    $('#launch_model').modal('show');
                                }
                            );

                        FollowingsService
                            .findFollowingsByUserId(following._id)
                            .then(
                                function (res) {
                                    vm.followings = res.data;
                                },
                                function (err) {
                                    vm.error = "Failed to retrieve followings for " + vm.user.username;
                                    $('#launch_model').modal('show');
                                }
                            );
                    },
                    function (err) {
                        vm.error = "Failed to retrieve User Info";
                        $('#launch_model').modal('show');
                    }
                );
        }
        
        init();

        function selectRecipe(recipe) {
            $location.url("/favourites/"+recipe.recipe_id);
        }

        function addFavourite(recipe) {
            delete recipe._id;
            delete recipe._user;
            FavouritesService
                .createFavourite($routeParams.uid, recipe)
                .then(
                    function (res) {
                        vm.success = "Saved favourite successfully";
                        $('#launch_model').modal('show');
                    },
                    function (err) {
                        vm.error = "Failed to save favourite";
                        $('#launch_model').modal('show');
                    }
                );
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