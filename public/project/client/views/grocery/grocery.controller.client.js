/**
 * Created by asubbarayigowda on 6/14/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("GroceryController", GroceryController);
    
    function GroceryController(GroceryService, $routeParams, $rootScope, UserService, $location) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.uid = $routeParams.uid;
        vm.addGrocery = addGrocery;
        vm.searchRecipe = searchRecipe;
        vm.logout = logout;

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
            var ingredients = "";

            $('input[type=checkbox]').each(function () {
                if(this.checked) {
                    ingredients = ingredients + "," + $(this).val();
                }
            });
            $location.url("/user/"+userId+"/search/"+ingredients);
            console.log(ingredients);
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (res) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function (err) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );

        }
    }
    
})();