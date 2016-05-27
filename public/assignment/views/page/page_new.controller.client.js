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
            var newPage = { "_id":new Date().getTime().toString(), "name":name, "websiteId":wid};
            PageService.createPage(wid, newPage);
            page_list();
        }

        function page_list() {
            $location.url("/user/" +uid + "/website/" +wid+"/page");
        }
    }

})();