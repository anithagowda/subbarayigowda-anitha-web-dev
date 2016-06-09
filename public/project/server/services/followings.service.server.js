/**
 * Created by asubbarayigowda on 6/9/16.
 */
module.exports = function (app, module) {
    app.post("/api/user/:userId/following", createFollowing);
    app.get("/api/user/:userId/following", findAllFollowingsForUser);
    app.get("/api/following/:followingId", findFollowingById);
    app.put("/api/following/:followingId", updateFollowing);
    app.delete("/api/following/:followingId", deleteFollowing);


    var followingModel = module.followingModel;

    function createFollowing(req, res) {
        var following = req.body;
        var userId = req.params.userId;

        followingModel
            .createFollowing(userId, following)
            .then(
                function (following) {
                    res.json(following);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function findAllFollowingsForUser(req, res) {
        var userId = req.params.userId;

        followingModel
            .findAllFollowingsForUser(userId)
            .then(
                function (followings) {
                    res.json(followings);
                },
                function (er) {
                    res.sendStatus(400);
                }
            );
    }

    function findFollowingById(req, res) {
        var followingId = req.params.followingId;
        followingModel
            .findFollowingById(followingId)
            .then(
                function (following) {
                    res.json(following);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function updateFollowing(req, res) {
        var followingId = req.params.followingId;
        var following = req.body;
        followingModel
            .updateFollowing(followingId, following)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteFollowing(req, res) {
        var followingId = req.params.followingId;
        followingModel
            .deleteFollowing(followingId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
};