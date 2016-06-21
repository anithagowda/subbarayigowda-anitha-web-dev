/**
 * Created by asubbarayigowda on 6/6/16.
 */
//encapsulate CRUD operations with DB

module.exports = function () {
    
    var mongoose = require("mongoose");
    var ProjUserSchema = require("./user.schema.server")();
    var ProjUser = mongoose.model("ProjectUser", ProjUserSchema);

    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername: findUserByUsername,
        findUserStartingWithUsername: findUserStartingWithUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findGoogleUser: findGoogleUser
    };
    
    return api;
    
    function createUser(user) {
        return ProjUser.create(user);
    }

    function findUserById(userId) {
        return ProjUser.findById(userId);
    }
    
    function findUserByUsername(username) {
        return ProjUser.findOne({username:username});
    }

    function findUserStartingWithUsername(username) {
        var query = {};
        query.username = new RegExp(username, 'i');
        return ProjUser.find(query);
    }

    function findUserByCredentials(username, password) {
        return ProjUser.findOne({username:username, password:password});
    }

    function findAllUsers() {
        return ProjUser.find();    
    }
    
    function updateUser(userId, user) {
        delete user._id; //remove _id field as older version of mongoDB complains about updating _id
        return ProjUser
            .update({_id:userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    url: user.url,
                    grocery: user.grocery,
                    followers: user.followers,
                    following: user.following
                }
            });
    }
    
    function deleteUser(userId) {
        return ProjUser.remove({_id: userId});
    }

    function findGoogleUser(id) {
        return ProjUser.findOne({"google.id" : id});
    }
};