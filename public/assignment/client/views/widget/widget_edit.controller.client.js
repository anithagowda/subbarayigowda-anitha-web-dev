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
            WidgetService
                .findWidgetById($routeParams.wgid)
                .then(
                    function (res) {
                        vm.widget = res.data;
                    },
                    function (err) {
                        vm.error = "Widget not found";
                    }
                );
        }
        init();

        function update_widget(widget) {
            if (widget.name === "" || widget.name == null) {
                vm.error = "Name cannot be empty";
                return;
            }

            WidgetService
                .updateWidget($routeParams.wgid, widget)
                .then(
                    function (res) {
                        $location.url("/user/"+$routeParams.uid+"/website/"+$routeParams.wid+"/page/"+$routeParams.pid+"/widget");
                    },
                    function (err) {
                        vm.error = "Update widget failed";
                    }
                );
            
        }

        function delete_widget(widget) {
            WidgetService
                .deleteWidget(widget._id)
                .then(
                    function (res) {
                        $location.url("/user/"+$routeParams.uid+"/website/"+$routeParams.wid+"/page/"+$routeParams.pid+"/widget");
                    },
                    function (err) {
                        vm.error = "Delete widget failed";
                    }
                );
            
        }
    }
})();