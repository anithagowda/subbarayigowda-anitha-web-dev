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
            .when("/login", {
                templateUrl: "/views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "/views/user/profile.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/website/website_list.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/website/website_edit.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/website/website_new.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/page/page_list.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/page/page_edit.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/page/page_new.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/widget/widget_list.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/widget/widget_choose.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/widget/widget_heading.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/widget/widget_image.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/widget/widget_youtube.view.client.html"
            });
    }

})();
