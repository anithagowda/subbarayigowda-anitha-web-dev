/**
 * Created by asubbarayigowda on 6/3/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("SearchRecipeController", SearchRecipeController);
    
    function SearchRecipeController(RecipeService, $routeParams, $location, UserService, $rootScope, FavouritesService) {
        var vm = this;
        var ingredients = $routeParams.ingredients;

        vm.searchRecipes = searchRecipes;
        vm.selectRecipe = selectRecipe;
        vm.checkLogin = checkLogin;
        vm.home = home;
        vm.logout = logout;

        function init() {
            searchRecipes(ingredients);
        }
        init();

        function searchRecipes(ingredients) {
            if (ingredients && ingredients !== "undefined") {
                RecipeService
                    .searchRecipe(ingredients)
                    .then(
                        function (res) {
                            vm.recipes = res.data;
                            if (vm.recipes.length === 0) {
                                vm.error = "Not an ingredient.. Try again"
                                $('#launch_model').modal('show');
                            }
                        },
                        function (err) {
                            vm.error = "Food2Fork error : "+err.data;
                            $('#launch_model').modal('show');
                        });
            } else {
                RecipeService
                    .getTopRecipes()
                    .then(
                        function (res) {
                            vm.recipes = res.data;
                        },
                        function (err) {
                            vm.error = "Food2Fork error : "+err.data;
                            $('#launch_model').modal('show');
                        });
            }

        }

        function selectRecipe(recipe) {
            $location.url("/favourites/"+recipe.recipe_id);
        }

        function checkLogin(recipe) {
            if($rootScope.currentUser.username) {
                FavouritesService
                    .createFavourite($rootScope.currentUser._id, recipe)
                    .then(
                        function (res) {
                            vm.success = "Saved favourite successfully";
                            $('#launch_model').modal('show');
                        },
                        function (err) {
                            vm.error = "Failed to save favourite";
                            $('#launch_model').modal('show');
                        }
                    );
            }
            else {
                vm.error = "Login to save favourites";
                $('#launch_model').modal('show');
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