/**
 * Created by asubbarayigowda on 6/10/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("FollowersProfileController", FollowersProfileController);
    
    function FollowersProfileController($routeParams, FollowersService, FavouritesService, $window, UserService) {
        
        var vm = this;
        vm.uid = $routeParams.uid;
        var followerid = $routeParams.followerid;
        vm.selectRecipe = selectRecipe;
        vm.addFavourite = addFavourite;

        function init() {
            FollowersService
                .findFollowerById(followerid)
                .then(
                    function (res) {
                        var follower = res.data.follower;
                        UserService
                            .findUserById(follower._id)
                            .then(
                                function (res) {
                                    vm.user = res.data;
                                },
                                function (err) {
                                    vm.error = "Failed to retrieve Follower info";
                                }
                            );

                        FavouritesService
                            .findFavouritesByUserId(follower._id)
                            .then(
                                function (res) {
                                    vm.favourites = res.data;
                                },
                                function (err) {
                                    vm.error = "Failed to retrieve favourites for " + vm.user.username;
                                }
                            );
                    },
                    function (err) {
                        vm.error = "Failed to retrieve User Info";
                    }
                );
        }
        
        init();

        function selectRecipe(recipe) {
            $window.open(recipe.source_url, '_blank');
        }

        function addFavourite(recipe) {
            delete recipe._id;
            delete recipe._user;
            FavouritesService
                .createFavourite($routeParams.uid, recipe)
                .then(
                    function (res) {
                        vm.success = "Saved favourite successfully";
                    },
                    function (err) {
                        vm.error = "Failed to save favourite";
                    }
                );
        }
    }
})();