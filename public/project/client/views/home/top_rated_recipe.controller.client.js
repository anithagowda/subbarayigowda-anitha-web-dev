/**
 * Created by asubbarayigowda on 6/5/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("TopRecipeController", TopRecipeController);
    
    function TopRecipeController(RecipeService, $rootScope, FavouritesService, $location, UserService) {
        var vm = this;
        vm.selectRecipe = selectRecipe;
        vm.checkLogin = checkLogin;
        vm.home = home;
        vm.logout = logout;

        function init() {
            RecipeService
                .getTopRecipes()
                .then(
                    function (res) {
                        vm.recipes = res.data;
                    },
                function (err) {
                    vm.error = "Unable to Fetch our Top Rated Recipe. Please try again later";
                    $('#launch_model').modal('show');
                });
        }
        init();

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
                            $('#launch_model').modal('show');
                        },
                        function (err) {
                            vm.error = "Failed to save favourite. Please try again later";
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