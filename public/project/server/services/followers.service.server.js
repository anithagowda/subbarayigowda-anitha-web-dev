/**
 * Created by asubbarayigowda on 6/9/16.
 */
module.exports = function (app, module) {
    app.post("/api/user/:userId/follower", createFollower);
    app.get("/api/user/:userId/follower", findAllFollowersForUser);
    app.get("/api/follower/:followerId", findFollowerById);
    app.put("/api/follower/:followerId", updateFollower);
    // app.delete("/api/follower/?id=followerId", deleteFollower);
    // app.delete("/api/follower/?name=followerName", deleteFollower);
    app.delete("/api/follower/", deleteFollower);


    var followerModel = module.followerModel;

    function createFollower(req, res) {
        var follower = req.body;
        var userId = req.params.userId;

        followerModel
            .createFollower(userId, follower)
            .then(
                function (follower) {
                    res.json(follower);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function findAllFollowersForUser(req, res) {
        var userId = req.params.userId;

        followerModel
            .findAllFollowersForUser(userId)
            .then(
                function (followers) {
                    res.json(followers);
                },
                function (er) {
                    res.sendStatus(400);
                }
            );
    }

    function findFollowerById(req, res) {
        var followerId = req.params.followerId;
        followerModel
            .findFollowerById(followerId)
            .then(
                function (follower) {
                    res.json(follower);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function updateFollower(req, res) {
        var followerId = req.params.followerId;
        var follower = req.body;
        followerModel
            .updateFollower(followerId, follower)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteFollower(req, res) {
        var followerId = req.query.id;
        var followerName = req.query.name;
        
        if (followerId) {
            deleteFollowerById(followerId, res);
        }
        else {
            deleteFollowerByName(followerName, res);
        }
        
    }
    
    function deleteFollowerById(followerId, res) {
        followerModel
            .deleteFollowerById(followerId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteFollowerByName(followerName, res) {
        followerModel
            .deleteFollowerByName(followerName)
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