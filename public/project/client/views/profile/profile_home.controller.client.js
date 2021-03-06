/**
 * Created by asubbarayigowda on 6/7/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .controller("ProfileHomeController", ProfileHomeController);

    function ProfileHomeController($routeParams, UserService, $location, $rootScope) {
        var vm = this;

        vm.uid = $rootScope.currentUser._id;
        vm.unregister = unregister;
        vm.updateUser = updateUser;
        vm.editUser = editUser;
        vm.editImage = editImage;
        vm.searchRecipeWithIngredient = searchRecipeWithIngredient;
        vm.logout = logout;
        vm.home = home;

        function init() {
            UserService
                .findUserById(vm.uid)
                .then(function (res) {
                    vm.user = res.data;
                });

            $(".profile").show();
            $(".edit").hide();

            $("#edit_img").show();
            $("#upload_img").hide();
        }
        init();
        
        function unregister() {
            UserService
                .logout()
                .then(function (res) {
                    $rootScope.currentUser = null;
                    UserService
                        .deleteUser(vm.uid)
                        .then(
                            function (res) {
                                $location.url("/");
                            },
                            function (err) {
                                vm.error = "Failed to remove user. Please try again later";
                                $('#launch_model').modal('show');
                            }
                        );
                });

        }

        function updateUser(user) {
            UserService
                .updateUser(vm.uid, user)
                .then(
                    function (res) {
                        if (res.status == 200) {
                            vm.success = "Updated successfully";
                            init();
                        }
                    },
                    function (err) {
                        vm.error = "Failed to update user. Please try again later";
                        $('#launch_model').modal('show');
                    });
        }

        function editImage() {
            $("#edit_img").hide();
            $("#upload_img").show();
        }

        function editUser() {
            $(".profile").hide();
            $(".edit").show();
        }

        function home() {
            if($rootScope.currentUser.username === 'admin') {
                $location.url("/admin/"+vm.uid);
            }
            else {
                $location.url("/user/"+vm.uid+"/grocery");
            }
        }
        
        function searchRecipeWithIngredient(ingredient) {
            $location.url("/user/"+vm.uid+"/search/"+ingredient);
        }
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (res) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function (err) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                );

        }
    }
})();