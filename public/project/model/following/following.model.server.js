/**
 * Created by asubbarayigowda on 6/9/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var ProjFollowingSchema = require("./following.schema.server")();
    var ProjFollowing = mongoose.model("ProjectFollowing", ProjFollowingSchema);

    var apis = {
        createFollowing: createFollowing,
        findAllFollowingsForUser: findAllFollowingsForUser,
        findFollowingById: findFollowingById,
        updateFollowing: updateFollowing,
        deleteFollowingById: deleteFollowingById,
        deleteFollowingByName: deleteFollowingByName
    };
    return apis;

    function createFollowing(userId, following) {
        following._user = userId;
        return ProjFollowing.create(following);
    }

    function findAllFollowingsForUser(userId) {
        return ProjFollowing.find({"_user": userId});
    }

    function findFollowingById(followingId) {
        return ProjFollowing.findById(followingId);
    }

    function updateFollowing(followingId, following) {
        return ProjFollowing.update({_id: followingId}, {$set: following});
    }

    function deleteFollowingById(followingId) {
        return ProjFollowing.remove({_id: followingId});
    }

    function deleteFollowingByName(followingName) {
        return ProjFollowing.remove({"following.username": followingName});
    }
};