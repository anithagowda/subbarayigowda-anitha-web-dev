/**
 * Created by asubbarayigowda on 6/3/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("SearchRecipeController", SearchRecipeController);
    
    function SearchRecipeController(SearchRecipeService) {
        var vm = this;

        vm.searchRecipes = searchRecipes;
        vm.selectRecipe = selectRecipe;

        function init() {
            SearchRecipeService
                .getTopRecipes()
                .then(function (res) {
                    vm.recipes = res.data;
                })
        }
        init();
        
        function searchRecipes(ingredients) {
            console.log(ingredients);
            SearchRecipeService
                .searchRecipe(ingredients)
                .then(function (res) {
                   vm.recipes = res.data.recipes;
                });
        }

        function selectRecipe(recipe) {
            console.log(recipe.title);
        }
    }
})();