/**
 * Created by asubbarayigowda on 5/30/16.
 */

module.exports = function (app) {
    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    //express uses only base url for matching. anything after ? is ignored
    // app.get("/api/user?username=username", findUserByUsername);
    // app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            findUserByCredentials(username, password, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }
    }

    function createUser(req, res) {
        var user = req.body;
        users.push(user);
    }

    function findUserByUsername(username, res) {
        for (var i in users) {
            if (users[i].username === username) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByCredentials(username, password, res) {
        for (var i in users) {
            if (users[i].username === username && users[i].password === password) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id === userId) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id === userId) {
                //assuming username is not allowed to be changed
                users[i].password = user.password;
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                res.send(200);
                return;
            }
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id === userId) {
                users.splice(i, 1);
                res.send(200);
                return;
            }
        }

    }
};