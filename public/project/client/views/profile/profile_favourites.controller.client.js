/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileFavouriteController", ProfileFavouriteController);
    
    function ProfileFavouriteController($routeParams, FavouritesService, $window) {
        var vm = this;
        
        vm.uid = $routeParams.uid;
        vm.selectRecipe = selectRecipe;

        function init() {
            FavouritesService
                .findFavouritesByUserId($routeParams.uid)
                .then(
                    function (res) {
                        vm.favourites = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve favourites"
                    }
                )
        }
        init();

        function selectRecipe(recipe) {
            $window.open(recipe.source_url, '_blank');
        }
    }
})();