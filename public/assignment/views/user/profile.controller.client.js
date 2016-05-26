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
        vm.user = UserService.findUserById(id);

        vm.updateUser = updateUser;
        vm.navigateToWebsite = navigateToWebsite;
        
        function updateUser(user) {
            UserService.updateUser(id, user);
            vm.success = true;
        }
        
        function navigateToWebsite() {
            $location.url("/user/"+id+"/website");
        }
    }
})();