/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileHomeController", ProfileHomeController);

    function ProfileHomeController($routeParams, UserService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.unregister = unregister;
        
        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function (res) {
                        $location.url("/");
                    },
                    function (err) {
                        vm.error = "Unable to remove user";
                    }
                );
        }
    }
})();