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
        var id = (new Date).getTime().toString();
        var newUser = {_id:id, username:user.username, password:user.password };
        users.push(newUser);
        res.send(newUser);
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
        var user = req.body;
        for (var i in users) {
            if (users[i]._id === userId) {
                //assuming username & password is not allowed to be changed
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id === userId) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
};