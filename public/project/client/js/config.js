/**
 * Created by asubbarayigowda on 6/3/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/search/:ingredients", {
                templateUrl: "views/search_recipe.view.client.html",
                controller: "SearchRecipeController",
                controllerAs: "model"
            })
            .when("/top_rated_recipe", {
                templateUrl: "views/top_rated_recipe.view.client.html",
                controller: "TopRecipeController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();