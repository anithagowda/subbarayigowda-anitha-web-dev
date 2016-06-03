/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verify_password) {
            UserService
                .findUserByUsername(username)
                .then(function (res) {
                    var user = res.data;
                    if (user._id) {
                        vm.error = "Username already in use!";
                    }
                    else {
                        createUser(username, password, verify_password);
                    }
                });
        }

        function createUser(username, password, verify_password) {
            if (password === verify_password) {
                UserService
                    .createUser(username, password)
                    .then(function (res) {
                        var user = res.data;
                        if (user) {
                            $location.url("/user/"+user._id);
                        }
                    });
            }
            else {
                vm.error = "Password doesn't match!"
            }
        }
    }
})();