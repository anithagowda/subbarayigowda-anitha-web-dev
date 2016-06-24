
/**
 * Created by asubbarayigowda on 6/9/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("FollowersController", FollowersController);
    
    function FollowersController($routeParams, FollowersService, $rootScope, UserService, $location) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.selectFollower = selectFollower;
        vm.logout = logout;
        vm.home = home;

        function init() {
            FollowersService
                .findFollowersByUserId($routeParams.uid)
                .then(
                    function (res) {
                        vm.followers = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve your followers..";
                    }
                );
        }
        init();

        function selectFollower(follower) {
            //Go to followers profile
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