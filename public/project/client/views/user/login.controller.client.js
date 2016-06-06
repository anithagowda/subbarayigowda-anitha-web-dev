/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService) {
        var vm = this;
        
        vm.login = login;
        
        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function (res) {
                    var user = res.data;
                    if (user._id) {
                        $location.url("/user/"+user._id);
                    }
                    else {
                        vm.error = "Invalid username/password!"
                    }
                });
        }
    }
})();