/**
 * Created by asubbarayigowda on 6/3/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/search", {
                templateUrl: "views/search_recipe.html",
                controller: "SearchRecipeController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/search"
            });
    }
})();