/**
 * Created by asubbarayigowda on 6/6/16.
 */
//encapsulate CRUD operations with DB

module.exports = function () {
    
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    //Var User holds instance of DB which helps us write to DB
    //Here "User" is the name of the model in mongoose
    var User = mongoose.model("User", UserSchema);
    
    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser
    };
    
    return api;
    
    function createUser(user) {
        console.log(user);
        return User.create(user);
    }

    function findUserById(userId) {
        //return User.find({_id: userId});//returns an array which contains only one element
        return User.findById(userId);//returns only one element
    }
    
    function findUserByUsername(username) {
        return User.findOne({username:username});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username:username, password:password});
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(userId, user) {
        delete user._id; //remove _id field as older version of mongoDB complains about updating _id
        return User
            .update({_id:userId}, {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }
};