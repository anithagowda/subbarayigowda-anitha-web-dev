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
            var user = UserService.findUserByUsername(username);
            if (user === -1) {
                if (password === verify_password) {
                    var id = (new Date).getTime().toString();
                    var newUser = {_id:id, username:username, password:password };
                    UserService.createUser(newUser);
                    $location.url("/user/"+id);
                }
                else {
                    vm.error = "Password doesn't match!"
                }
            }
            else {
                vm.error = "Username already in use!"
            }
        }
    }
})();