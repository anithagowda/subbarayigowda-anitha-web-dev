/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileHomeController", ProfileHomeController);

    function ProfileHomeController($routeParams, UserService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.unregister = unregister;
        vm.updateUser = updateUser;
        vm.editUser = editUser;

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
                .deleteUser(id)
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
                        }
                    },
                    function (err) {
                        vm.error = "Unable to update user";
                    });
            init();
        }

        function editUser() {
            $(".profile").hide();
            $(".edit").show();
        }
    }
})();