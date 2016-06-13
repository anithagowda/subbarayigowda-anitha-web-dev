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
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/search/:ingredients", {
                templateUrl: "views/home/search_recipe.view.client.html",
                controller: "SearchRecipeController",
                controllerAs: "model"
            })
            .when("/top_rated_recipe", {
                templateUrl: "views/home/top_rated_recipe.view.client.html",
                controller: "TopRecipeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/profile/profile_home.view.client.html",
                controller: "ProfileHomeController",
                controllerAs: "model"
            })
            .when("/user/:uid/search/:ingredients", {
                templateUrl: "views/profile/profile_search.view.client.html",
                controller: "ProfileSearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/favourites", {
                templateUrl: "views/favourites/favourites.view.client.html",
                controller: "FavouriteController",
                controllerAs: "model"
            })
            .when("/user/:uid/followers", {
                templateUrl: "views/followers/followers.view.client.html",
                controller: "FollowersController",
                controllerAs: "model"
            })
            .when("/user/:uid/following", {
                templateUrl: "views/following/following.view.client.html",
                controller: "FollowingsController",
                controllerAs: "model"
            })
            .when("/user/:uid/following/:followingid", {
                templateUrl: "views/following/following_profile.view.client.html",
                controller: "FollowingProfileController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();