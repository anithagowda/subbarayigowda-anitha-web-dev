/**
 * Created by asubbarayigowda on 6/2/16.
 */
(function () {
    angular
        .module("WAMDirectives", [])
        .directive("sort", sort);// camel case directives when used in html will have hyphen Ex: mySort => my-sort

    function sort() {
        var start;
        var end;

        //scope - scope of the DOM element, hence access to all controllers and vm values in there
        //element - element on which this directive is applied
        //attributes - any other attributes to the element
        function linker(scope, element, attributes) {
            $(element).sortable({
                axis: 'y',
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop : function (event, ui) {
                    end = ui.item.index();
                    //modify
                    // var temp = scope.model.widgets[start];
                    // if (start < end) {
                    //     for (var i = start; i < end; i++) {
                    //         scope.model.widgets[i] = scope.model.widgets[i+1];
                    //     }
                    // }
                    // else {
                    //     for (var i = start; i > end; i--) {
                    //         scope.model.widgets[i] = scope.model.widgets[i-1];
                    //     }
                    // }
                    // scope.model.widgets[end] = temp;

                    // var startElement = scope.model.widgets.splice(start, 1);
                    // scope.model.widgets.splice(end, 0, startElement[0]); //insert element at end

                    scope.model.reorderWidget(start, end);
                    //scope.callback({start: startIndex, end: endIndex});
                    //notify everybody that the data has been changed
                    scope.$apply();
                }
            });
        }

        return {
            link: linker // to link to the low level DOM; call linker back with DOM accessor
            //template: <Text to return>
            //templateUrl: <html link>
            //scope: {
            //  data: "=", //access model.data defined in html
            //  callback: "&" //access model callback function defined in html
            //}
        }
    }

})();