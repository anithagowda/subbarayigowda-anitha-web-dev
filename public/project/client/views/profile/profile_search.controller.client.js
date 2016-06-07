/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileSearchController", ProfileSearchController);
    
    function ProfileSearchController($routeParams, RecipeService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        var ingredients = $routeParams.ingredients;

        function init() {
            RecipeService
                .searchRecipe(ingredients)
                .then(
                    function (res) {
                        vm.recipes = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retreive recipes"
                    }
                )
        }
        init();
    }
})();