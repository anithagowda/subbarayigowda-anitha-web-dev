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
                .then(function (res) {
                    if (res.status == 200) {
                        vm.success = true;
                    }
                });
        }
        
        function navigateToWebsite() {
            $location.url("/user/"+id+"/website");
        }
    }
})();