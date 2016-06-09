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
        updateFavourite: updateFavourite,
        deleteFavourite: deleteFavourite
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
    
    function updateFavourite(favouriteId, favourite) {
        return ProjFavourites.update({_id: favouriteId}, {$set: favourite});
    }
    
    function deleteFavourite(favouriteId) {
        return ProjFavourites.remove({_id: favouriteId});
    }
};