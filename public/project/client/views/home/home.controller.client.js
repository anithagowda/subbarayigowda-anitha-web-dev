/**
 * Created by asubbarayigowda on 6/5/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("HomeController",HomeController);
    
    function HomeController($location, UserService, RecipeService, $rootScope, FavouritesService) {
        var vm = this;

        vm.searchRecipes = searchRecipes;
        vm.selectRecipe = selectRecipe;
        vm.checkLogin = checkLogin;
        vm.home = home;
        vm.logout = logout;
        
        function init() {
            $('.carousel').carousel({
                interval: 3000
            });
            
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

        function checkLogin(recipe) {
            if ($rootScope.currentUser) {
                FavouritesService
                    .createFavourite($rootScope.currentUser._id, recipe)
                    .then(
                        function (res) {
                            vm.success = "Saved favourite successfully";
                        },
                        function (err) {
                            vm.error = "Failed to save favourite";
                        }
                    );
            }
            else {
                vm.error = "Login to save favourites";
            }
        }

        function home() {
            if($rootScope.currentUser.username === 'admin') {
                $location.url("/admin/"+$rootScope.currentUser._id);
            }
            else {
                $location.url("/user/"+$rootScope.currentUser._id+"/grocery");
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