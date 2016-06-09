/**
 * Created by asubbarayigowda on 6/9/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var ProjFollowersSchema = require("./followers.schema.server")();
    var ProjFollowers = mongoose.model("ProjectFollowers", ProjFollowersSchema);

    var apis = {
        createFollower: createFollower,
        findAllFollowersForUser: findAllFollowersForUser,
        findFollowerById: findFollowerById,
        updateFollower: updateFollower,
        deleteFollower: deleteFollower
    };
    return apis;

    function createFollower(userId, Follower) {
        Follower._user = userId;
        return ProjFollowers.create(Follower);
    }

    function findAllFollowersForUser(userId) {
        return ProjFollowers.find({"_user": userId});
    }

    function findFollowerById(FollowerId) {
        return ProjFollowers.findById(FollowerId);
    }

    function updateFollower(FollowerId, Follower) {
        return ProjFollowers.update({_id: FollowerId}, {$set: Follower});
    }

    function deleteFollower(FollowerId) {
        return ProjFollowers.remove({_id: FollowerId});
    }
};