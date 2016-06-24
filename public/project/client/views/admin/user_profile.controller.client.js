/**
 * Created by asubbarayigowda on 6/19/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("UserProfileController", UserProfileController);
    
    function UserProfileController(UserService, $routeParams, FavouritesService, FollowersService, FollowingsService, $location, $rootScope) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = $routeParams.uid;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.home = home;
        
        function init() {
            UserService
                .findUserById(uid)
                .then(
                    function (res) {
                        vm.user = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve User info";
                        $('#launch_model').modal('show');
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
                        $('#launch_model').modal('show');
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
                        $('#launch_model').modal('show');
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
                        $('#launch_model').modal('show');
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
                        $('#launch_model').modal('show');
                    },
                    function (err) {
                        vm.error = "Failed to delete user";
                        $('#launch_model').modal('show');
                    }
                );
        }

        function home() {
            if($rootScope.currentUser.username === 'admin') {
                $location.url("/admin/"+vm.uid);
            }
            else {
                $location.url("/user/"+vm.uid);
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