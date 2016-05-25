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
                templateUrl: "views/home.html"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html"
            })
            .when("/website_list", {
                templateUrl: "views/website/website_list.view.client.html"
            })
            .when("/website_edit", {
                templateUrl: "views/website/website_edit.view.client.html"
            })
            .when("/website_new", {
                templateUrl: "views/website/website_new.view.client.html"
            })
            .when("/page_list", {
                templateUrl: "views/page/page_list.view.client.html"
            })
            .when("/page_edit", {
                templateUrl: "views/page/page_edit.view.client.html"
            })
            .when("/page_new", {
                templateUrl: "views/page/page_new.view.client.html"
            })
            .when("/widget_list", {
                templateUrl: "views/widget/widget_list.view.client.html"
            })
            .when("/widget_choose", {
                templateUrl: "views/widget/widget_choose.view.client.html"
            })
            .when("/widget_heading", {
                templateUrl: "views/widget/widget_heading.view.client.html"
            })
            .when("/widget_image", {
                templateUrl: "views/widget/widget_image.view.client.html"
            })
            .when("/widget_youtube", {
                templateUrl: "views/widget/widget_youtube.view.client.html"
            })
            .otherwise({
                redirectTo: "/login"
            })
    }

})();
