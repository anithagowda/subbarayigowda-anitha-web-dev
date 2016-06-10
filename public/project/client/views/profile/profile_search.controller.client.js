/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileSearchController", ProfileSearchController);
    
    function ProfileSearchController($routeParams, RecipeService, FavouritesService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        var ingredients = $routeParams.ingredients;

        vm.addFavourite = addFavourite;

        function init() {
            RecipeService
                .searchRecipe(ingredients)
                .then(
                    function (res) {
                        vm.recipes = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retreive recipes";
                    }
                );
        }
        init();
        
        function addFavourite(recipe) {
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