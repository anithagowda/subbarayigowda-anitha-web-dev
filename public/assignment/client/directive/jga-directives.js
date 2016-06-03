/**
 * Created by asubbarayigowda on 6/2/16.
 */
(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jga-sortable", jga_sortable);

    function jga_sortable() {
        var start;
        var end;

        //scope - scope of the DOM element, hence access to all controllers and vm values in there
        //element - element on which this directive is applied
        //attributes - any other attributes to the element
        function link(scope, element, attributes) {
            $(element).sortable({
                axis: 'y',
                start: function (event, ui) {
                    start = ui.item.index();
                    console.log(start);
                },
                stop : function (event, ui) {
                    end = ui.item.index();
                    console.log(end);
                    //modify
                    var temp = scope.model.widgets[start];
                    if (start < end) {
                        for (var i = start; i < end; i++) {
                            scope.model.widgets[i] = scope.model.widgets[i+1];
                        }
                    }
                    else {
                        for (var i = start; i > end; i--) {
                            scope.model.widgets[i] = scope.model.widgets[i-1];
                        }
                    }
                    scope.model.widgets[end] = temp;


                    //notify everybody that the data has been changed
                    scope.$apply();
                }
            });
        }

        return {
            link: link
        }
    }

})();