/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("FavouriteController", FavouriteController);
    
    function FavouriteController($routeParams, FavouritesService, $window) {
        var vm = this;
        
        vm.uid = $routeParams.uid;
        vm.selectRecipe = selectRecipe;
        vm.removeFavourite = removeFavourite;

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

        function removeFavourite(recipe) {
            FavouritesService
                .deleteFavourite(recipe._id)
                .then(
                    function (res) {
                        vm.success = "Successfully removed your favourite recipe";
                        init();
                    },
                    function (err) {
                        vm.error = "Failed to remove your favourite recipe";
                    }
                )
        }
    }
})();