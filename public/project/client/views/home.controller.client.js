/**
 * Created by asubbarayigowda on 6/5/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("HomeController",HomeController);
    
    function HomeController($location) {
        var vm = this;

        vm.searchRecipes = searchRecipes;

        function searchRecipes(ingredients) {
            $location.url("#/search/"+ingredients);
        }
    }
})();