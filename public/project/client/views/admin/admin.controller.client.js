/**
 * Created by asubbarayigowda on 6/19/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("AdminController", AdminController);
    
    function AdminController(UserService, $location, $rootScope) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.home = home;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (res) {
                        vm.users = res.data;
                    },
                    function (err) {
                        vm.error = err;
                        $('#launch_model').modal('show');
                    }
                );
        }
        init();

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(
                    function (res) {
                        vm.success = "User deleted";
                        $('#launch_model').modal('show');
                        init();
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