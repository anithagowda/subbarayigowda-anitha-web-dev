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
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
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
            .when("/user/:uid/follower/:followerid", {
                templateUrl: "views/followers/followers_profile.view.client.html",
                controller: "FollowersProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/grocery", {
                templateUrl: "views/grocery/grocery.view.client.html",
                controller: "GroceryController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });

        //$q allows to work with promises
        function checkLoggedIn(UserService, $location, $q) {

            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (res) {
                        var user = res.data;
                        if (user == '0') {
                            deferred.reject();
                            $location.url("/login");
                        }
                        else {
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }
    }
})();