/**
 * Created by asubbarayigowda on 6/5/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("TopRecipeController", TopRecipeController);
    
    function TopRecipeController(SearchRecipeService, $window) {
        var vm = this;
        vm.selectRecipe = selectRecipe;

        function init() {
            SearchRecipeService
                .getTopRecipes()
                .then(
                    function (res) {
                        vm.recipes = res.data;
                    },
                function (err) {
                    vm.error = "Unable to Fetch our Top Rated Recipe. Please try again later";
                })
        }
        init();

        function selectRecipe(recipe) {
            console.log(recipe.title);
            $window.open(recipe.source_url, '_blank');
        }
    }
})();