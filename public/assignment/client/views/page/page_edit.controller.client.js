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
            PageService
                .findPageById(pid)
                .then(
                    function (res) {
                        vm.page = res.data;
                    },
                function (err) {
                    vm.error = "Page not found";
                });
        }
        
        init();
        
        function delete_page() {
            PageService
                .deletePage(pid)
                .then(
                    function (res) {
                        page_list();
                    },
                    function (err) {
                        vm.error = "Failed to delete the page";
                    }
                );
            
        }

        function page_list() {
            $location.url("/user/" +uid + "/website/" +wid+"/page");
        }

        function update_page(page) {
            if (page.name === "" || page.name == null) {
                vm.error = "Name cannot be empty";
                return;
            }

            var newPage = { "name":page.name, "websiteId":wid};
            PageService
                .updatePage(pid, newPage)
                .then(
                    function (res) {
                        page_list();
                    },
                    function (err) {
                        vm.error = "Failed to update the page";
                    }
                );
        }
    }
})();
