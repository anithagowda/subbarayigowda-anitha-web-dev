/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileSearchController", ProfileSearchController);
    
    function ProfileSearchController($routeParams, RecipeService, FavouritesService, $window, $rootScope, $location, UserService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        var ingredients = $routeParams.ingredients;

        vm.addFavourite = addFavourite;
        vm.selectRecipe = selectRecipe;
        vm.searchRecipeWithIngredient = searchRecipeWithIngredient;
        vm.home = home;
        vm.logout = logout;

        function init() {
            RecipeService
                .searchRecipe(ingredients)
                .then(
                    function (res) {
                        vm.recipes = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve recipes. Please try again later";
                        $('#launch_model').modal('show');
                    }
                );
        }
        init();
        
        function addFavourite(recipe) {
            FavouritesService
                .createFavourite($routeParams.uid, recipe)
                .then(
                    function (res) {
                        vm.success = "Saved favourite successfully";
                        $('#launch_model').modal('show');
                    },
                    function (err) {
                        vm.error = "Failed to save favourite. Please try again later";
                        $('#launch_model').modal('show');
                    }
                );
        }

        function selectRecipe(recipe) {
            $location.url("/favourites/"+recipe.recipe_id);
        }

        function searchRecipeWithIngredient(ingredient) {
            $location.url("/user/"+vm.uid+"/search/"+ingredient);
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