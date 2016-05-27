/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        var uid = $routeParams.uid;
        
        vm.uid = $routeParams.uid;
        vm.create_website = create_website;
        vm.website_list = website_list;

        function create_website(name, description) {
            var id = new Date().getTime().toString();
            var newWebsite = { "_id": id, "name": name, "developerId": uid};
            WebsiteService.createWebsite(uid, newWebsite);
            website_list();
        }

        function website_list() {
            $location.url("/user/" + uid + "/website");
        }
    }
})();