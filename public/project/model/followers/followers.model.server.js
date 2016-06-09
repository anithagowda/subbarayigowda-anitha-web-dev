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

    function createFollower(userId, follower) {
        follower._user = userId;
        return ProjFollowers.create(follower);
    }

    function findAllFollowersForUser(userId) {
        return ProjFollowers.find({"_user": userId});
    }

    function findFollowerById(followerId) {
        return ProjFollowers.findById(followerId);
    }

    function updateFollower(followerId, follower) {
        return ProjFollowers.update({_id: followerId}, {$set: follower});
    }

    function deleteFollower(followerId) {
        return ProjFollowers.remove({_id: followerId});
    }
};