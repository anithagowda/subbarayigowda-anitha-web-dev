/**
 * Created by asubbarayigowda on 6/8/16.
 */
module.exports = function () {
  
    var mongoose = require("mongoose");
    var ProjFavouritesSchema = require("./favourites.schema.server")();
    var ProjFavourites = mongoose.model("ProjectFavourites", ProjFavouritesSchema);
    
    var apis = {
        createFavourite: createFavourite,
        findAllFavouritesForUser: findAllFavouritesForUser,
        findFavouriteById: findFavouriteById,
        findFavouriteByRecipeId: findFavouriteByRecipeId,
        updateFavourite: updateFavourite,
        deleteFavourite: deleteFavourite,
        deleteFavouriteForUser: deleteFavouriteForUser
    };
    return apis;
    
    function createFavourite(userId, favourite) {
        favourite._user = userId;
        return ProjFavourites.create(favourite);
    }
    
    function findAllFavouritesForUser(userId) {
        return ProjFavourites.find({"_user": userId});
    }
    
    function findFavouriteById(favouriteId) {
        return ProjFavourites.findById(favouriteId);
    }

    function findFavouriteByRecipeId(rId) {
        return ProjFavourites.findOne({"recipe_id": rId});
    }
    
    function updateFavourite(favouriteId, favourite) {
        return ProjFavourites.update({_id: favouriteId}, {$set: favourite});
    }
    
    function deleteFavourite(favouriteId) {
        return ProjFavourites.remove({_id: favouriteId});
    }

    function deleteFavouriteForUser(userId) {
        return ProjFavourites.remove({"_user": userId});
    }
};