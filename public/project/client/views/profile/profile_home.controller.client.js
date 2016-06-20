/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileHomeController", ProfileHomeController);

    function ProfileHomeController($routeParams, UserService, $location, $rootScope) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.unregister = unregister;
        vm.updateUser = updateUser;
        vm.editUser = editUser;
        vm.logout = logout;
        vm.home = home;

        function init() {
            UserService
                .findUserById($routeParams.uid)
                .then(function (res) {
                    vm.user = res.data;
                });

            $(".profile").show();
            $(".edit").hide();
        }
        init();
        
        function unregister() {
            UserService
                .deleteUser($routeParams.uid)
                .then(
                    function (res) {
                        $location.url("/");
                    },
                    function (err) {
                        vm.error = "Unable to remove user";
                    }
                );
        }

        function updateUser(user) {
            UserService
                .updateUser($routeParams.uid, user)
                .then(
                    function (res) {
                        if (res.status == 200) {
                            vm.success = "Updated successfully";
                            init();
                        }
                    },
                    function (err) {
                        vm.error = "Unable to update user";
                    });
        }

        function editUser() {
            $(".profile").hide();
            $(".edit").show();
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