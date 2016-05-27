/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var uid = $routeParams.uid;
        
        vm.uid = $routeParams.uid;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(uid);
        }
        init();

    }
})();