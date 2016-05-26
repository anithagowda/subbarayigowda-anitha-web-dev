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
            var user = UserService.findUserByCredentials(username, password);
            if (user === -1) {
                vm.error = "Invalid username/password!"
            }
            else {
                $location.url("/user/"+user._id);
            }
        }
    }
})();