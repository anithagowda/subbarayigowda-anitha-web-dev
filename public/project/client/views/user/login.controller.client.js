/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService, $rootScope) {
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
                            $rootScope.currentUser = user;
                            $rootScope.$broadcast('currentUser', {loggedUser : user});
                            if (user.username === 'admin') {
                                $location.url("/admin/"+user._id);
                            }
                            else {
                                $location.url("/user/"+user._id+"/grocery");
                            }
                        }
                    },
                    function (err) {
                        vm.error = "Invalid username/password!"
                    });
        }
    }
})();