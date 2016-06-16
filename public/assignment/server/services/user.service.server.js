/**
 * Created by asubbarayigowda on 5/30/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, module) {

    /*Any number of elements can read from the request or any other modifications
    * Here both login and passport receives it
    * Passport intercepts the request to get username and password
    * local is the standard name for local strategy (as username and password are authenticated against our local DB)*/
    app.post("/api/login", passport.authenticate('local'), login);

    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);

    /*express uses only base url for matching. anything after ? is ignored*/
    // app.get("/api/user?username=username", findUserByUsername);
    // app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);

    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/logout", logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);


    var UserModel = module.userModel;

    passport.use('local', new LocalStrategy(localStrategy)); /*Here local need not be given as its a default name*/
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    /*input values are intercepted values from body; done is the status*/
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

    /*serialized user for the browser to be saved in cookie(encrypt n save)*/
    function serializeUser(user, done) {
        done(null, user);
    }

    /*called everytime browser makes any request*/
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
        /*If control comes to login, that implies user is authorized. If not control doesnt come here*/
        /*user is saved in req by passport*/
        var user = req.user;
        res.json(user);
    }
    
    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password) {
            findUserByCredentials(username, password, req, res);
        }
        else if (username) {
            findUserByUsername(username, req, res);
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

    function findUserByUsername(username, req, res) {
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                }
            );
    }

    function findUserByCredentials(username, password, req, res) {
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    console.log(req.session);
                    req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(404).send(err);
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
                    res.sendStatus(404).send(err);
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
                    res.sendStatus(404).send(err);
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
                    res.sendStatus(404).send(err);
                }
            );
    }

    function logout(req, res) {
        req.logout(); /*invalidate session and cokkie, by passport*/
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