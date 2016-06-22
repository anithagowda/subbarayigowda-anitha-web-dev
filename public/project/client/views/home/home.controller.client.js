/**
 * Created by asubbarayigowda on 6/5/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("HomeController",HomeController);
    
    function HomeController($location, UserService, RecipeService, $rootScope) {
        var vm = this;

        vm.searchRecipes = searchRecipes;
        vm.selectRecipe = selectRecipe;
        vm.home = home;
        vm.logout = logout;
        
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

        function selectRecipe(recipe) {
            $location.url("/favourites/"+recipe.recipe_id);
        }
        
        function home() {
            if($rootScope.currentUser.username === 'admin') {
                $location.url("/admin/"+$rootScope.currentUser._id);
            }
            else {
                $location.url("/user");
            }
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