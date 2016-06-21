/**
 * Created by asubbarayigowda on 6/21/16.
 */
module.exports = function (app, module) {
    app.post("/api/user/:userId/favourite/:favouriteId/comment", createComment);
    app.get("/api/user/:userId/comment", findAllCommentsForUser);
    app.get("/api/recipe/:rId/comment", findAllCommentsForRecipe);
    app.get("/api/comment/:commentId", findCommentById);
    app.put("/api/comment/:commentId", updateComment);
    app.delete("/api/comment/:commentId", deleteComment);


    var commentModel = module.commentsModel;

    function createComment(req, res) {
        var comment = req.body;
        var userId = req.params.userId;
        var favouriteId = req.params.favouriteId;

        commentModel
            .createComment(userId, favouriteId, comment)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllCommentsForUser(req, res) {
        var userId = req.params.userId;

        commentModel
            .findAllCommentsForUser(userId)
            .then(
                function (favourites) {
                    res.json(favourites);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllCommentsForRecipe(req, res) {
        var rId = req.params.rId;

        commentModel
            .findAllCommentsForRecipe(rId)
            .then(
                function (comments) {
                    res.json(comments);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findCommentById(req, res) {
        var commentId = req.params.commentId;
        commentModel
            .findCommentById(commentId)
            .then(
                function (comment) {
                    res.json(comment);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updateComment(req, res) {
        var commentId = req.params.commentId;
        var comment = req.body;
        
        commentModel
            .updateComment(commentId, comment)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteComment(req, res) {
        var commentId = req.params.commentId;
        commentModel
            .deleteComment(commentId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

};