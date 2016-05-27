/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);
    
    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        
        vm.uid = $routeParams.uid;
        vm.delete_page = delete_page;
        vm.page_list = page_list;
        vm.update_page = update_page;

        function init() {
            vm.page = PageService.findPageById(pid);
        }
        
        init();
        
        function delete_page() {
            PageService.deletePage(pid);
            page_list();
        }

        function page_list() {
            $location.url("/user/" +uid + "/website/" +wid+"/page");
        }

        function update_page(page) {
            var newPage = { "_id":pid, "name":page.name, "websiteId":wid};
            PageService.updatePage(pid, newPage);
            page_list();
        }
    }
})();
