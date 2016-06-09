/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        vm.uid = $routeParams.uid;
        vm.create_page = create_page;
        vm.page_list = page_list;

        function create_page(name, title) {
            if (name === "" || name == null) {
                vm.error = "Name cannot be empty";
                return;
            }

            var newPage = { "name":name, "title": title, "websiteId":wid};
            PageService
                .createPage(wid, newPage)
                .then(function (res) {
                    var page = res.data;
                    if (page._id) {
                        page_list();
                    }
                    else {
                        vm.error = "Failed to create page";
                    }
                });
        }

        function page_list() {
            $location.url("/user/" +uid + "/website/" +wid+"/page");
        }
    }

})();