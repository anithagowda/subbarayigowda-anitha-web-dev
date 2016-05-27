/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        vm.uid = $routeParams.uid;
        vm.update_website = update_website;
        vm.website_list = website_list;
        vm.delete_website = delete_website;

        vm.website = WebsiteService.findWebsiteById(wid);;

        function update_website(website) {
            WebsiteService.updateWebsite(wid, website);
            website_list();
        }

        function website_list() {
            $location.url("/user/" + uid + "/website");
        }

        function delete_website() {
            WebsiteService.deleteWebsite(wid);
            website_list();
        }
    }
})();