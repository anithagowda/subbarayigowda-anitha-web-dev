/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);
    
    function EditPageController($routeParams, $location, PageService, WebsiteService) {
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

            WebsiteService
                .findWebsiteById(wid)
                .then(function (res) {
                    var website = res.data;
                    for (var i in website.pages) {
                        if(website.pages[i] === pid) {
                            website.pages.splice(i,1);
                            WebsiteService.updateWebsite(wid, website);
                            return;
                        }
                    }
                });
            
        }

        function page_list() {
            $location.url("/user/" +uid + "/website/" +wid+"/page");
        }

        function update_page(page) {
            if (page.name === "" || page.name == null) {
                vm.error = "Name cannot be empty";
                return;
            }

            var newPage = { "name":page.name, "title":page.title, "websiteId":wid};
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

            WebsiteService
                .findWebsiteById(wid)
                .then(function (res) {
                    var website = res.data;
                    for (var i in website.pages) {
                        if(website.pages[i] === pid) {
                            var edit = website.pages.splice(i,1);
                            edit.name = newPage.name;
                            edit.title = newPage.title;
                            website.pages.push(edit);
                            WebsiteService.updateWebsite(wid, website);
                            return;
                        }
                    }
                });
        }
    }
})();
