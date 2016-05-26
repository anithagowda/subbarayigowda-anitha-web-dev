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
            var user = UserService.findUserByUsername(username);
            if (user === -1) {
                vm.error = "Invalid username!"
            }
            else if (user.password === password) {
                $location.url("/profile/"+user._id);
            }
            else {
                vm.error = "Password Incorrect!"
            }
        }
    }
})();