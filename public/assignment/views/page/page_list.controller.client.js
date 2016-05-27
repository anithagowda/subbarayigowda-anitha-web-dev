/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);
    
    function PageListController($routeParams, $location, PageService) {
        var vm = this;
       
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        
        vm.new_page = new_page;
        vm.website_list = website_list;
        vm.page_edit = page_edit;

        vm.pages = PageService.findPageByWebsiteId(wid);

        function new_page() {
            $location.url("/user/" + uid + "/website/" + wid+ "/page/new");
        }
        
        function website_list() {
            $location.url("/user/" + uid + "/website");
        }

        function page_edit(page) {
            $location.url("/user/" + uid + "/website/" + wid+ "/page/" + page._id);
        }
    }
})();