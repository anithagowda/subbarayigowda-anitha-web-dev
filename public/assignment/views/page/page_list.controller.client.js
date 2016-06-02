/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        var wid = $routeParams.wid;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        
        function init() {
            PageService
                .findPageByWebsiteId(wid)
                .then(function (res) {
                    vm.pages = res.data;
                });
        }
        init();

    }
})();