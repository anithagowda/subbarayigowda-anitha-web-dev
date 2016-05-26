/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($routeParams, $location, WidgetService) {
        var vm = this;
        
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId($routeParams.pid);
        }
        init();
    }
})();