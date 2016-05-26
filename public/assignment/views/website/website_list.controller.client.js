/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $location, WebsiteService) {
        var vm = this;
        var uid = $routeParams.uid;
        
        vm.page_list = page_list;
        vm.edit_website = edit_website;
        vm.new_website = new_website;

        vm.websites = WebsiteService.findWebsitesByUser(uid);
        
        function page_list(website_id) {
            $location.url("/user/" + uid + "/website/" + website_id + "/page");
        }
        
        function edit_website(website_id) {
            $location.url("/user/" + uid + "/website/" + website_id );
        }

        function new_website(website) {
            $location.url("/user/" + uid + "/website/new" );
        }
    }
})();