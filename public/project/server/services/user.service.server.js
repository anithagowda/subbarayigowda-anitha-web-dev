/**
 * Created by asubbarayigowda on 5/30/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, module) {
    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    
    app.post("/api/login", passport.authenticate('olKitchen'), login);
    app.post("/api/logout", logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    
    passport.use('olKitchen', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    
    var UserModel = module.userModel;
    var FollowingModel = module.followingModel;
    var FollowerModel = module.followerModel;
    var FavouriteModel = module.favouriteModel;

    function localStrategy(username, password, done) {
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        done(null, user); /*only case control goes to login*/
                    }
                    else {
                        done(null, false);
                    }
                },
                function (err) {
                    done(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        /*nothing to deserialize, just make sure user is still available in DB*/
        UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

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

    /*----/api/user?username=username---*/
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

    /*----/api/user?search=username---*/
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

    /*----/api/user?username=username&password=password---*/
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
            .findUserById(userId)
            .then(function (user) {
                FollowerModel.deleteFollowerByName(user.username).then(function (stat) {});
                //FollowerModel.deleteFollowerByUserId(userId).then(function (stat) {});
                FollowingModel.deleteFollowingByName(user.username).then(function (stat) {});
                //FollowingModel.deleteFollowingByUserId(userId).then(function (stat) {});
                FavouriteModel.deleteFavouriteForUser(userId).then(function (stat) {});

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
            });
    }

    function logout(req, res) {
        req.logout(); /*invalidate session and cookie, by passport*/
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        res.status(400).send("Username already in use!");
                        return;
                    }
                    else {
                        /*hasSync - synchronous call*/
                        req.body.password = bcrypt.hashSync(password);
                        return UserModel
                            .createUser(req.body);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            /*this then is for createUser*/
            .then(
                function (user) {
                    if (user) {
                        /*passport login - serialize and send them to browser to be added in cookie*/
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }
};