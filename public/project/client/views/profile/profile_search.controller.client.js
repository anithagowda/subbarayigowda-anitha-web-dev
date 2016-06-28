/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileSearchController", ProfileSearchController);
    
    function ProfileSearchController($routeParams, RecipeService, FavouritesService, $window, $rootScope, $location, UserService) {
        var vm = this;
        var path = $location.path();

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
                        $("#spinner").hide();
                    },
                    function (err) {
                        vm.error = "Food2Fork error : "+err.data;
                        // $('#launch_model').modal('show');
                        launchModal();
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

        function launchModal() {
            if ($location.path() === path) {
                $('#launch_model').modal('show');
                $("#spinner").hide();
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