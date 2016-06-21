/**
 * Created by asubbarayigowda on 6/3/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("SearchRecipeController", SearchRecipeController);
    
    function SearchRecipeController(RecipeService, $window, $routeParams, $location, UserService, $rootScope, FavouritesService) {
        var vm = this;
        var ingredients = $routeParams.ingredients;

        vm.selectRecipe = selectRecipe;
        vm.checkLogin = checkLogin;
        vm.home = home;
        vm.logout = logout;

        function init() {
            RecipeService
                .searchRecipe(ingredients)
                .then(function (res) {
                    vm.recipes = res.data;
                });
        }
        init();
        

        function selectRecipe(recipe) {
            console.log(recipe.title);
            $window.open(recipe.source_url, '_blank');
        }

        function checkLogin(recipe) {
            if($rootScope.currentUser.username) {
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