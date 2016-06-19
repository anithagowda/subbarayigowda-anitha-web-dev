/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService) {
        var vm = this;
        
        vm.login = login;
        
        function login(username, password) {
            if (username === "" || password === "" || username == null || password == null) {
                //vm.error = "Username & Password required";
                return;
            }
            
            UserService
                .login(username, password)
                .then(function (res) {
                    var user = res.data;
                    if (user == null) {
                        vm.error = "Invalid username/password!";
                    }
                    else {
                        $location.url("/user");
                    }
                },
                function (err) {
                    vm.error = "Invalid username/password!"
                });
        }
    }
})();