/**
 * Created by asubbarayigowda on 6/8/16.
 */
module.exports = function () {
  
    var mongoose = require("mongoose");
    
    var url = 'mongodb://localhost/webdev_project';

    // if OPENSHIFT env variables are present, use the available connection info:
    if (process.env.OPENSHIFT_MONGODB_DB_URL) {
        url = process.env.OPENSHIFT_MONGODB_DB_URL +
            process.env.OPENSHIFT_APP_NAME;
    }

    var connect = function () {
        console.log(url);
        mongoose.connect(url);
    };
    connect();

    var db = mongoose.connection;

    db.on('error', function(error){
        console.log("Error loading the db - "+ error);
    });

    db.on('disconnected', connect);
    
    var models = {
        userModel: require("./user/user.model.server")(),
        favouriteModel: require("./favourites/favourites.model.server")(),
        followerModel: require("./followers/followers.model.server")(),
        followingModel: require("./following/following.model.server")(),
        groceryModel: require("./grocery/grocery.model.server")()
    };
    return models;
};