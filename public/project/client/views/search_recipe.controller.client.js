/**
 * Created by asubbarayigowda on 6/3/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("SearchRecipeController", SearchRecipeController);
    
    function SearchRecipeController(RecipeService, $window, $routeParams) {
        var vm = this;
        var ingredients = $routeParams.ingredients;

        vm.selectRecipe = selectRecipe;
        
        function init() {
            RecipeService
                .searchRecipe(ingredients)
                .then(function (res) {
                    vm.recipes = res.data;
                });
        }
        init();
        

        function selectRecipe(recipe) {
            console.log(recipe.title);
            $window.open(recipe.source_url, '_blank');
        }
    }
})();