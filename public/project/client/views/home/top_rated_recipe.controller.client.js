/**
 * Created by asubbarayigowda on 6/5/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("TopRecipeController", TopRecipeController);
    
    function TopRecipeController(RecipeService, $window, $rootScope, FavouritesService, $location) {
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
                })
        }
        init();

        function selectRecipe(recipe) {
            console.log(recipe.title);
            $window.open(recipe.source_url, '_blank');
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
                $location.url("/user/"+$rootScope.currentUser._id);
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