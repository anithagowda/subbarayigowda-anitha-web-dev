/**
 * Created by asubbarayigowda on 5/30/16.
 */

module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function createUser(req, res) {
        var user = req.body;
        users.push(newUser);
    }

    function findUserByUsername(req, res) {
    }

    function findUserByCredentials(req, res) {

    }

    function findUserById(req, res) {
        var userId = req.params.userId;
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
    }
};