/**
 * Created by asubbarayigowda on 6/6/16.
 */
//encapsulate CRUD operations with DB

module.exports = function () {
    
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    //User holds instance of DB which helps us write to DB
    var User = mongoose.model("User", UserSchema);
    
    var api = {
        createUser : createUser,
        findUserById : findUserById
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
};