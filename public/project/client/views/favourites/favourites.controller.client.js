/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("FavouriteController", FavouriteController);
    
    function FavouriteController($routeParams, FavouritesService, $window, $rootScope, UserService, $location) {
        var vm = this;
        
        vm.uid = $routeParams.uid;
        vm.selectRecipe = selectRecipe;
        vm.searchRecipeWithIngredient = searchRecipeWithIngredient;
        vm.removeFavourite = removeFavourite;
        vm.logout = logout;
        vm.home = home;

        function init() {
            FavouritesService
                .findFavouritesByUserId($routeParams.uid)
                .then(
                    function (res) {
                        vm.favourites = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve favourites";
                        $('#launch_model').modal('show');
                    }
                )
        }
        init();

        function selectRecipe(recipe) {
            $location.url("/favourites/"+recipe.recipe_id);
            //$window.open(recipe.source_url, '_blank');
        }
        
        function searchRecipeWithIngredient(ingredient) {
            $location.url("/user/"+vm.uid+"/search/"+ingredient);
        }
        
        function removeFavourite(recipe) {
            FavouritesService
                .deleteFavourite(recipe._id)
                .then(
                    function (res) {
                        vm.success = "Successfully removed your favourite recipe";
                        init();
                    },
                    function (err) {
                        vm.error = "Failed to remove your favourite recipe";
                        $('#launch_model').modal('show');
                    }
                )
        }

        function home() {
            if($rootScope.currentUser.username === 'admin') {
                $location.url("/admin/"+vm.uid);
            }
            else {
                $location.url("/user/"+vm.uid+"/grocery");
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