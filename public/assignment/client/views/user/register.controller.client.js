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
            if (username === "" || password === "" || verify_password === "" ||
                username == null || password == null || verify_password == null) {
                vm.error = "Username, Password & Verify_password required";
                return;
            }

            UserService
                .findUserByUsername(username)
                .then(function (res) {
                    var user = res.data;
                    if (user == null) {
                        createUser(username, password, verify_password);
                    }
                    else {
                        vm.error = "Username already in use!";
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
                vm.error = "Passwords don't match!"
            }
        }
    }
})();