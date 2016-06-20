/**
 * Created by asubbarayigowda on 6/5/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("HomeController",HomeController);
    
    function HomeController($location, UserService, RecipeService) {
        var vm = this;

        vm.searchRecipes = searchRecipes;
        
        function init() {
            RecipeService
                .getTopRecipes()
                .then(
                    function (res) {
                        vm.recipes = res.data.splice(0,6);
                    },
                    function (err) {
                        vm.error = "Unable to Fetch our Top Rated Recipe. Please try again later";
                    });
            
            UserService
                .checkInsertAdmin()
                .then(
                    function (res) {
                        //Admin created
                    }
                );
        }
        init();

        function searchRecipes(ingredients) {
            $location.url("/search/"+ingredients);
        }
    }
})();