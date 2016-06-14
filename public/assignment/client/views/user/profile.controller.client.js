/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var id = $routeParams.uid;

        vm.updateUser = updateUser;
        vm.navigateToWebsite = navigateToWebsite;
        vm.unregister = unregister;
        vm.logout = logout;
        
        function init() {
            UserService
                .findUserById(id)
                .then(function (res) {
                    vm.user = res.data;
                });
        }
        init();
        
        function updateUser(user) {
            UserService
                .updateUser(id, user)
                .then(
                    function (res) {
                        if (res.status == 200) {
                            vm.success = "Updated successfully";
                        }
                    },
                function (err) {
                    vm.error = "Unable to update user";
                });
        }
        
        function navigateToWebsite() {
            $location.url("/user/"+id+"/website");
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function (res) {
                        $location.url("/login");
                    },
                    function (err) {
                        vm.error = "Unable to remove user";
                    }
                );
        }
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (res) {
                        $location.url("/login");
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );
            
        }
    }
})();