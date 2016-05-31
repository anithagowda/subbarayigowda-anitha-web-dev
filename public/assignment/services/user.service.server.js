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

    function createUser(req, res) {

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