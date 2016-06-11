/**
 * Created by asubbarayigowda on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($routeParams, $location, WidgetService, PageService) {
        var vm = this;
        
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        
        var pid = $routeParams.pid;

        vm.create_header = create_header;
        vm.create_image = create_image;
        vm.create_youtube = create_youtube;
        vm.create_html = create_html;
        vm.create_text = create_text;

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
        
        function create_text() {
            create_widget("TEXT");
        }
        
        function create_widget(widget_type) {
            var widget = {"widgetType": widget_type, "pageId": $routeParams.pid};
            WidgetService
                .createWidget($routeParams.pid, widget)
                .then(function (res) {
                    var widget = res.data;
                    if (widget._id){
                        updatePage(widget);
                        $location.url("user/"+$routeParams.uid+"/website/"+$routeParams.wid+"/page/"+$routeParams.pid+"/widget/"+widget._id);
                    }
                });
        }

        function updatePage(newWidget) {
            PageService
                .findPageById(pid)
                .then(function (res) {
                    var page = res.data;
                    if(page.widgets) {
                        page.widgets.push(newWidget);
                    }
                    else {
                        page.widgets = [newWidget];
                    }
                    PageService.updatePage(pid, page);
                });
        }
    }
})();