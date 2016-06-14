/**
 * Created by asubbarayigowda on 6/14/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("GroceryController", GroceryController);
    
    function GroceryController(GroceryService, $routeParams) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.uid = $routeParams.uid;
        vm.addGrocery = addGrocery;

        function init() {
            GroceryService
                .findGroceriesByUserId(userId)
                .then(
                    function (res) {
                        vm.groceries = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve grocery list";
                    }
                )
        }
        init();

        function addGrocery(grocery) {
            GroceryService
                .createGrocery(userId, grocery)
                .then(
                    function (res) {
                        $(".clear_search").val("");
                        init();
                    },
                    function (err) {
                        vm.error = "Failed to add Ingredients";
                    }
                )
        }

        function searchRecipe() {
            $('input[type=checkbox]').each(function () {
                var sThisVal = (this.checked ? $(this).val() : "");
            });
        }
    }
    
})();