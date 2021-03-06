/**
 * Created by asubbarayigowda on 5/24/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    //dependency injection : we are not responsible for the instantiation and lifecycle of routeProvider
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.client.html"
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
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website_list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website_new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website_edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page_list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page_new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page_edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget_list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget_choose.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget_edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: "views/widget/widget_flickr_search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/login"
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
    }

})();
