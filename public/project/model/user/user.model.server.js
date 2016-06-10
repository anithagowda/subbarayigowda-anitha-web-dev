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
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    
    return api;
    
    function createUser(user) {
        return ProjUser.create(user);
    }

    function findUserById(userId) {
        //return User.find({_id: userId});//returns an array which contains only one element
        return ProjUser.findById(userId);//returns only one element
    }
    
    function findUserByUsername(username) {
        return ProjUser.findOne({username:username});
    }

    function findUserStartingWithUsername(username) {
        //return ProjUser.findOne({username:{$regex: /^al/i}});
        var query = {};
        query.username = new RegExp(username, 'i');
        return ProjUser.find(query);
    }

    function findUserByCredentials(username, password) {
        return ProjUser.findOne({username:username, password:password});
    }

    function updateUser(userId, user) {
        delete user._id; //remove _id field as older version of mongoDB complains about updating _id
        return ProjUser
            .update({_id:userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    grocery: user.grocery,
                    followers: user.followers,
                    following: user.following
                }
            });
    }
    
    function deleteUser(userId) {
        return ProjUser.remove({_id: userId});
    }
};