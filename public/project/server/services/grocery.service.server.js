/**
 * Created by asubbarayigowda on 6/14/16.
 */

module.exports = function (app, module) {

    app.post("/api/user/:userId/grocery", createGrocery);
    app.get("/api/user/:userId/grocery", findAllGroceriesForUser);
    app.get("/api/grocery/:groceryId", findGroceryById);
    app.put("/api/grocery/:groceryId", updateGrocery);
    // app.delete("/api/grocery/?groceryId=groceryId", deleteGroceryById);
    // app.delete("/api/grocery/?userId=userId", deleteGroceryByUserId);
    app.delete("/api/grocery/", deleteGrocery);


    var groceryModel = module.groceryModel;

    function createGrocery(req, res) {
        var grocery = req.body;
        var userId = req.params.userId;

        groceryModel
            .createGrocery(userId, grocery)
            .then(
                function (grocery) {
                    res.json(grocery);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function findAllGroceriesForUser(req, res) {
        var userId = req.params.userId;

        groceryModel
            .findAllGroceriesForUser(userId)
            .then(
                function (groceries) {
                    res.json(groceries);
                },
                function (er) {
                    res.sendStatus(400);
                }
            );
    }

    function findGroceryById(req, res) {
        var groceryId = req.params.groceryId;
        groceryModel
            .findGroceryById(groceryId)
            .then(
                function (grocery) {
                    res.json(grocery);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function updateGrocery(req, res) {
        var groceryId = req.params.groceryId;
        var grocery = req.body;
        groceryModel
            .updateGrocery(groceryId, grocery)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteGrocery(req, res) {
        var groceryId = req.query.groceryId;
        var userId = req.query.userId;

        if (groceryId) {
            deleteGroceryById(groceryId, res);
        }
        else {
            deleteAllGroceriesForUser(userId, res);
        }

    }

    function deleteGroceryById(groceryId, res) {
        groceryModel
            .deleteGroceryById(groceryId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteAllGroceriesForUser(userID, res) {
        groceryModel
            .deleteAllGroceriesForUser(userID)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
};