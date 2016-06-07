/**
 * Created by asubbarayigowda on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.create_header = create_header;
        vm.create_image = create_image;
        vm.create_youtube = create_youtube;
        vm.create_html = create_html;

        function create_header() {
            create_widget("HEADER");
        }

        function create_image() {
            create_widget("IMAGE");
        }

        function create_youtube() {
            create_widget("YOUTUBE");
        }

        function create_html() {
            create_widget("HTML");
        }
        
        function create_widget(widget_type) {
            var widget = {"widgetType": widget_type, "pageId": $routeParams.pid};
            WidgetService
                .createWidget($routeParams.pid, widget)
                .then(function (res) {
                    var widget = res.data;
                    if (widget._id){
                        $location.url("user/"+$routeParams.uid+"/website/"+$routeParams.wid+"/page/"+$routeParams.pid+"/widget/"+widget._id);
                    }
                });

        }
    }
})();