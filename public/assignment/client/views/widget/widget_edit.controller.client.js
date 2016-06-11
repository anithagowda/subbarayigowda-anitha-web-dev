/**
 * Created by asubbarayigowda on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService, PageService) {
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

            PageService
                .findPageById($routeParams.pid)
                .then(function (res) {
                    var page = res.data;
                    for (var i in page.widgets) {
                        if(page.widgets[i] === $routeParams.wgid) {
                            var edit = page.widgets.splice(i,1);

                            edit.name = widget.name;
                            edit.text = widget.text;
                            if(widget.widgetType === "HEADER") {
                                edit.size = widget.size;
                            }
                            else if(widget.widgetType === "HTML") {
                                edit.text = widget.text;
                            }
                            else if(widget.widgetType === "IMAGE" || widget.widgetType === "YOUTUBE") {
                                edit.url   = widget.url;
                                edit.width = widget.width;
                            }
                            else if(widget.widgetType === "TEXT") {
                                edit.placeholder = widget.placeholder;
                                edit.rows = widget.rows;
                                edit.formatted = widget.formatted;
                            }

                            page.widgets.push(edit);
                            PageService.updatePage($routeParams.pid, page);
                            return;
                        }
                    }
                });
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

            PageService
                .findPageById($routeParams.pid)
                .then(function (res) {
                    var page = res.data;
                    for (var i in page.widgets) {
                        if(page.widgets[i] === widget._id) {
                            page.widgets.splice(i,1);
                            PageService.updatePage($routeParams.pid, page);
                            return;
                        }
                    }
                });
        }
    }
})();