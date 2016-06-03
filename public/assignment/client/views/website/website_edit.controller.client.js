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

        function init() {
            WebsiteService
                .findWebsiteById(wid)
                .then(function (res) {
                    vm.website = res.data;
                });
        }
        init();
       
        function update_website(website) {
            WebsiteService
                .updateWebsite(wid, website)
                .then(
                    function (res) {
                        website_list();
                    },
                    function (err) {
                        vm.error = "Failed to update website";
                    }
                );
        }

        function website_list() {
            $location.url("/user/" + uid + "/website");
        }

        function delete_website() {
            WebsiteService
                .deleteWebsite(wid)
                .then(
                    function (res) {
                        website_list();
                    },
                    function (err) {
                        vm.error = "Failed to delete website";
                    }
                );
        }
    }
})();