/**
 * Created by asubbarayigowda on 6/21/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .factory("CommentsService", CommentsService);

    function CommentsService($http) {

        var apis = {
            createComment : createComment,
            findCommentsByUserId : findCommentsByUserId,
            findCommentsByRecipeId : findCommentsByRecipeId,
            findCommentById : findCommentById,
            updateComment : updateComment,
            deleteComment : deleteComment
        };


        function createComment(userId, favouriteId, comment) {
            comment._user = userId;
            comment._favourite = favouriteId;
            var url = "/api/user/"+userId+"/favourite/"+favouriteId+"/comment";
            return $http.post(url, comment);
        }

        function findCommentsByUserId(userId) {
            var url = "/api/user/"+userId+"/comment";
            return $http.get(url);
        }

        function findCommentsByRecipeId(rId) {
            var url = "/api/recipe/"+rId+"/comment";
            return $http.get(url);
        }
        
        function findCommentById(commentId) {
            var url = "/api/comment/"+commentId;
            return $http.get(url);
        }

        function updateComment(commentId, comment) {
            var url = "/api/comment/"+commentId;
            return $http.put(url, comment);
        }

        function deleteComment(commentId) {
            var url = "/api/comment/"+commentId;
            return $http.delete(url);
        }

        return apis;
    }
})();