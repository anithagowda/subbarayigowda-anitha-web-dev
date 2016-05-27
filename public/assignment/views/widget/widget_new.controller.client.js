/**
 * Created by asubbarayigowda on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
        
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
    }
})();