/**
 * Created by asubbarayigowda on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.update_widget = update_widget;
        vm.delete_widget = delete_widget;

        function init() {
            vm.widget = WidgetService.findWidgetById($routeParams.wgid);
        }
        init();

        function update_widget(widget) {
            WidgetService.updateWidget($routeParams.wid, widget);
            $location.url("/user/"+$routeParams.uid+"/website/"+$routeParams.wid+"/page/"+$routeParams.pid+"/widget");
        }

        function delete_widget(widget) {
            WidgetService.deleteWidget(widget._id);
            $location.url("/user/"+$routeParams.uid+"/website/"+$routeParams.wid+"/page/"+$routeParams.pid+"/widget");
        }
    }
})();