/**
 * Created by asubbarayigowda on 6/16/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("HeaderController", HeaderController);
    
    function HeaderController($rootScope, UserService, $location) {
        var vm = this;

        var scope = $rootScope;
        vm.user = scope.currentUser;
        vm.loggedIn = vm.user ? true : false;

        console.log("LoggedIn: "+vm.loggedIn);

        vm.logout = logout;
        
        function init() {
            scope.$on('currentUser', function (event, data) {
                vm.user = data.loggedUser;
                vm.loggedIn = vm.user ? true : false;
            });

            if (vm.loggedIn) {
                $(".loggedIn").show();
                $(".loggedOut").hide();
            }
            else {
                $(".loggedIn").hide();
                $(".loggedOut").show();
            }
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (res) {
                        scope.currentUser = null;
                        $rootScope.$broadcast('currentUser', {loggedUser : null});
                        $location.url("/login");
                    },
                    function (err) {
                        $rootScope.currentUser = null;
                        $rootScope.$broadcast('currentUser', {loggedUser : null});
                        $location.url("/login");
                    }
                );

        }
    }
    
})();