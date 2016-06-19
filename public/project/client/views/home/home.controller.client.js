/**
 * Created by asubbarayigowda on 6/5/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("HomeController",HomeController);
    
    function HomeController($location, UserService) {
        var vm = this;

        vm.searchRecipes = searchRecipes;
        
        function init() {
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