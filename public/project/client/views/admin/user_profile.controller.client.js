/**
 * Created by asubbarayigowda on 6/19/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("UserProfileController", UserProfileController);
    
    function UserProfileController(UserService, $routeParams, FavouritesService, FollowersService, FollowingsService, $location) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = $routeParams.uid;
        vm.deleteUser = deleteUser;
        
        function init() {
            UserService
                .findUserById(uid)
                .then(
                    function (res) {
                        vm.user = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve User info";
                    }
                );

            FavouritesService
                .findFavouritesByUserId(uid)
                .then(
                    function (res) {
                        vm.favourites = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve favourites for " + vm.user.username;
                    }
                );

            FollowersService
                .findFollowersByUserId(uid)
                .then(
                    function (res) {
                        vm.followers = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve followers for " + vm.user.username;
                    }
                );

            FollowingsService
                .findFollowingsByUserId(uid)
                .then(
                    function (res) {
                        vm.followings = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve followings for " + vm.user.username;
                    }
                );
        }
        init();
        
        function deleteUser() {
            UserService
                .deleteUser(uid)
                .then(
                    function (res) {
                        vm.success = "User deleted";
                        $location.url("/admin/"+uid);
                    },
                    function (err) {
                        vm.error = "Failed to delete user";
                    }
                );
        }
    }
    
})();