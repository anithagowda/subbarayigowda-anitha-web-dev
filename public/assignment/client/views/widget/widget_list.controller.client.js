/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        
        vm.getSafeHTML = getSafeHTML;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidget = reorderWidget;
        
        function init() {
            WidgetService
                .findWidgetsByPageId($routeParams.pid)
                .then(function (res) {
                    vm.widgets = res.data;

                    //angular is not notified of the change in order
                    // $(".container").sortable({
                    //     axis : 'y'
                    // });
                });
        }
        init();
        
        function getSafeHTML(widget) {
            return $sce.trustAsHtml(widget.text);
        }
        
        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
        
        function reorderWidget(start, end) {
            console.log("reorderWidget"+start+end);
            WidgetService
                .reorderWidget($routeParams.pid, start, end)
                .then(
                    function (res) {
                        init();
                    },
                    function (err) {
                        vm.error = "Sorting Failed";
                    }
                );
        }
    }
})();