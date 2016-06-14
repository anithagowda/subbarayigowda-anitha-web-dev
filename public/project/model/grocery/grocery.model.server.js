/**
 * Created by asubbarayigowda on 6/14/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var ProjGrocerySchema = require("./grocery.schema.server")();
    var ProjGrocery = mongoose.model("ProjectGrocery", ProjGrocerySchema);

    var apis = {
        createGrocery: createGrocery,
        findAllGroceriesForUser: findAllGroceriesForUser,
        findGroceryById: findGroceryById,
        updateGrocery: updateGrocery,
        deleteGroceryById: deleteGroceryById,
        deleteAllGroceriesForUser: deleteAllGroceriesForUser
    };
    return apis;

    function createGrocery(userId, grocery) {
        grocery._user = userId;
        return ProjGrocery.create(follower);
    }

    function findAllGroceriesForUser(userId) {
        return ProjGrocery.find({"_user": userId});
    }

    function findGroceryById(groceryId) {
        return ProjGrocery.findById(groceryId);
    }

    function updateGrocery(followerId, grocery) {
        return ProjGrocery.update({_id: followerId}, {$set: grocery});
    }

    function deleteGroceryById(groceryId) {
        return ProjGrocery.remove({_id: groceryId});
    }

    function deleteAllGroceriesForUser(userId) {
        return ProjGrocery.remove({"_user": ObjectId(userId)});
    }
};