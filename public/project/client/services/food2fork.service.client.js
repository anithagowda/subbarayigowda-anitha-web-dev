/**
 * Created by asubbarayigowda on 6/3/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .factory("RecipeService", RecipeService);

    function RecipeService($http) {

        var api = {
            searchRecipe: searchRecipe,
            getTopRecipes: getTopRecipes,
            getRecipe: getRecipe
        };
        return api;
        
        function searchRecipe(ingredients) {
            return $http.get("/search/"+ingredients);
        }

        function getTopRecipes() {
            return $http.get("/top_recipes");
        }

        function getRecipe(rId) {
            return $http.get("/get/"+rId);
        }
    }
})();