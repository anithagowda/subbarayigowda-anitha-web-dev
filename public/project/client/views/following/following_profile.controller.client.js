/**
 * Created by asubbarayigowda on 6/10/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("FollowingProfileController", FollowingProfileController);
    
    function FollowingProfileController($routeParams, FollowingsService, FavouritesService, $window) {
        
        var vm = this;
        vm.uid = $routeParams.uid;
        var followingid = $routeParams.followingid;
        vm.selectRecipe = selectRecipe;
        vm.addFavourite = addFavourite;

        function init() {
            FollowingsService
                .findFollowingById(followingid)
                .then(
                    function (res) {
                        vm.user = res.data.following;
                        FavouritesService
                            .findFavouritesByUserId(vm.user._id)
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