/**
 * Created by asubbarayigowda on 5/30/16.
 */

module.exports = function (app, module) {
    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    //express uses only base url for matching. anything after ? is ignored
    // app.get("/api/user?username=username", findUserByUsername);
    // app.get("/api/user?username=username&password=password", findUserByCredentials);
    // app.get("/api/user?search=username", findUserStartingWithUsername);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var UserModel = module.userModel;

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var search = req.query.search;

        if (search) {
            findUserStartingWithUsername(search, res);
        }
        else if (username && password) {
            findUserByCredentials(username, password, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
    }

    function createUser(req, res) {
        var user = req.body;

        UserModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.json(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findUserByUsername(username, res) {
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(404);
                }
            );
    }

    function findUserStartingWithUsername(username, res) {
        UserModel
            .findUserStartingWithUsername(username)
            .then(
                function (user) {
                    console.log(user[0].username);
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(404);
                }
            );
    }

    function findUserByCredentials(username, password, res) {
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(404);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(404);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        UserModel
            .updateUser(userId, user)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(404);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        UserModel
            .deleteUser(userId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(404);
                }
            );
    }
};