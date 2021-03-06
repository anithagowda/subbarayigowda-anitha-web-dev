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
            .when("/admin/:uid", {
                templateUrl: "views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/admin/user/:uid", {
                templateUrl: "views/admin/user_profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/", {
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
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/favourites", {
                templateUrl: "views/favourites/favourites.view.client.html",
                controller: "FavouriteController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/favourites/:rId", {
                templateUrl: "views/favourites/fav_recipe.view.client.html",
                controller: "FavRecipeController",
                controllerAs: "model"
            })
            .when("/user/:uid/followers", {
                templateUrl: "views/followers/followers.view.client.html",
                controller: "FollowersController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/following", {
                templateUrl: "views/following/following.view.client.html",
                controller: "FollowingsController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/following/:followingid", {
                templateUrl: "views/following/following_profile.view.client.html",
                controller: "FollowingProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/follower/:followerid", {
                templateUrl: "views/followers/followers_profile.view.client.html",
                controller: "FollowersProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/google/grocery", {
                templateUrl: "views/grocery/google_redirect_grocery.view.client.html",
                controller: "GroceryController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/grocery", {
                templateUrl: "views/grocery/grocery.view.client.html",
                controller: "GroceryController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/"
            });

        //$q allows to work with promises
        function checkLoggedIn(UserService, $location, $q, $rootScope) {

            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (res) {
                        var user = res.data;
                        if (user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }
                        else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }
        
        function checkAdminLoggedIn() {
            
        }
    }
})();