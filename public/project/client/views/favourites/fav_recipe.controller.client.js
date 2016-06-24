/**
 * Created by asubbarayigowda on 6/21/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("FavRecipeController", FavRecipeController);
    
    function FavRecipeController($routeParams, RecipeService, CommentsService, UserService, $rootScope, $location) {
        var vm = this;
        vm.addComment = addComment;
        vm.saveComment = saveComment;
        vm.cancel = cancel;
        vm.logout = logout;
        vm.home = home;

        function init() {
            $("#addComment_div").hide();
            $("#addComment_btn").show();
            RecipeService
                .getRecipe($routeParams.rId)
                .then(
                    function (res) {
                        vm.recipe = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve information about your Recipe";
                        $('#launch_model').modal('show');
                    }
                );

            CommentsService
                .findCommentsByRecipeId($routeParams.rId)
                .then(
                    function (res) {
                        vm.comments = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve comments for this Recipe";
                        $('#launch_model').modal('show');
                    }
                );

            if ($rootScope.currentUser) {
                vm.uid = $rootScope.currentUser._id;
                UserService
                    .findUserById(vm.uid)
                    .then(
                        function (res) {
                            vm.user = res.data;
                        }
                    );
            }
        }
        init();

        function addComment() {
            if ($rootScope.currentUser) {
                $("#addComment_div").show();
                $("#addComment_btn").hide();
            }
            else {
                vm.error = "Login to write comments";
                $('#launch_model').modal('show');
            }
        }

        function saveComment(comment) {
            comment.recipeId = $routeParams.rId;
            comment.username = vm.user.username;
            CommentsService
                .createComment(vm.user._id, $routeParams.rId, comment)
                .then(
                    function (res) {
                        init();
                    },
                    function (err) {
                        vm.error = "Failed to save your comment";
                        $('#launch_model').modal('show');
                        $("#addComment_div").hide();
                        $("#addComment_btn").show();
                    }
                )
        }

        function cancel() {
            $("#addComment_div").hide();
            $("#addComment_btn").show();
        }


        function home() {
            if($rootScope.currentUser.username === 'admin') {
                $location.url("/admin/"+vm.uid);
            }
            else {
                $location.url("/user/"+vm.uid+"/grocery");
            }
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