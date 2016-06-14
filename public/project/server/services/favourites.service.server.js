/**
 * Created by asubbarayigowda on 6/7/16.
 */
module.exports = function (app, module) {
    app.post("/api/user/:userId/favourite", createFavourite);
    app.get("/api/user/:userId/favourite", findAllFavouritesForUser);
    app.get("/api/favourite/:favouriteId", findFavouriteById);
    app.put("/api/favourite/:favouriteId", updateFavourite);
    app.delete("/api/favourite/:favouriteId", deleteFavourite);
    app.delete("/api/user/:userId/favourite", deleteFavouriteForUser);
    

    var favouriteModel = module.favouriteModel;
    
    function createFavourite(req, res) {
        var favourite = req.body;
        var userId = req.params.userId;

        favouriteModel
            .createFavourite(userId, favourite)
            .then(
                function (favourite) {
                    res.json(favourite);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllFavouritesForUser(req, res) {
        var userId = req.params.userId;
        
        favouriteModel
            .findAllFavouritesForUser(userId)
            .then(
                function (favourites) {
                    res.json(favourites);
                },
                function (er) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findFavouriteById(req, res) {
        var favouriteId = req.params.favouriteId;
        favouriteModel
            .findFavouriteById(favouriteId)
            .then(
                function (favourite) {
                    res.json(favourite);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updateFavourite(req, res) {
        var favouriteId = req.params.favouriteId;
        var favourite = req.body;
        favouriteModel
            .updateFavourite(favouriteId, favourite)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteFavourite(req, res) {
        var favouriteId = req.params.favouriteId;
        favouriteModel
            .deleteFavourite(favouriteId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
    
    function deleteFavouriteForUser(req, res) {
        var userId = req.params.userId;
        favouriteModel
            .deleteFavouriteForUser(userId)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
};