/**
 * Created by asubbarayigowda on 6/20/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var ProjCommentsSchema = require("./comments.schema.server")();
    var ProjComments = mongoose.model("ProjectComments", ProjCommentsSchema);

    var apis = {
        createComment: createComment,
        findAllCommentsForUser: findAllCommentsForUser,
        findAllCommentsForRecipe: findAllCommentsForRecipe,
        findCommentById: findCommentById,
        updateComment: updateComment,
        deleteComment: deleteComment
    };
    return apis;

    function createComment(userId, favouriteId, comment) {
        comment._user = userId;
        comment._favourite = favouriteId;
        return ProjComments.create(comment);
    }

    function findAllCommentsForUser(userId) {
        return ProjComments.find({"_user": userId});
    }

    function findAllCommentsForRecipe(rId) {
        return ProjComments.find({"recipeId": rId});
    }

    function findCommentById(commentId) {
        return ProjComments.findById(commentId);
    }

    function updateComment(commentId, comment) {
        return ProjComments.update({_id: commentId}, {$set: comment});
    }

    function deleteComment(commentId) {
        return ProjComments.remove({_id: commentId});
    }
};