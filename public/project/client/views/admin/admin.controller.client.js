/**
 * Created by asubbarayigowda on 6/19/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("AdminController", AdminController);
    
    function AdminController(UserService) {
        var vm = this;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (res) {
                        vm.users = res.data;
                    },
                    function (err) {
                        vm.error = err;
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
                        init();
                    },
                    function (err) {
                        vm.error = "Failed to delete user";
                    }
                );
        }
    }
})();