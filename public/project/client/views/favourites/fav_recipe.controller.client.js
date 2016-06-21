/**
 * Created by asubbarayigowda on 6/21/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("FavRecipeController", FavRecipeController);
    
    function FavRecipeController($routeParams, RecipeService, CommentsService, UserService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.addComment = addComment;
        vm.saveComment = saveComment;
        vm.cancel = cancel;

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
                    }
                );

            UserService
                .findUserById(vm.uid)
                .then(
                    function (res) {
                        vm.user = res.data;
                    }
                )
        }
        init();

        function addComment() {
            $("#addComment_div").show();
            $("#addComment_btn").hide();
        }

        function saveComment(comment) {
            comment.recipeId = $routeParams.rId;
            comment.username = vm.user.username;
            CommentsService
                .createComment($routeParams.uid, $routeParams.rId, comment)
                .then(
                    function (res) {
                        init();
                    },
                    function (err) {
                        vm.error = "Failed to save your comment";
                        $("#addComment_div").hide();
                        $("#addComment_btn").show();
                    }
                )
        }

        function cancel() {
            $("#addComment_div").hide();
            $("#addComment_btn").show();
        }
    }
})();