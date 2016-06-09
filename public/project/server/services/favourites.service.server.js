/**
 * Created by asubbarayigowda on 6/7/16.
 */
module.exports = function (app, module) {
    app.post("/api/user/:userId/favourite", createFavourite);
    app.get("/api/user/:userId/favourite", findAllFavouritesForUser);
    app.get("/api/favourite/:favouriteId", findFavouriteById);
    app.put("/api/favourite/:favouriteId", updateFavourite);
    app.delete("/api/favourite/:favouriteId", deleteFavourite);

    // var favourites = [
    //     {
    //         "_id": "111",
    //         "userId": "234",
    //         "title": "Jalapeno Popper Grilled Cheese Sandwich",
    //         "source_url": "http://www.closetcooking.com/2011/04/jalapeno-popper-grilled-cheese-sandwich.html",
    //         "image_url": "http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg"},
    //     {
    //         "_id": "112",
    //         "userId": "234",
    //         "title": "Perfect Iced Coffee",
    //         "source_url": "http://thepioneerwoman.com/cooking/2011/06/perfect-iced-coffee/",
    //         "image_url": "http://static.food2fork.com/icedcoffee5766.jpg"
    //     }
    // ];

    var favouriteModel = module.favouriteModel;
    
    function createFavourite(req, res) {
        var favourite = req.body;
        var userId = req.params.userId;

        // var id = new Date().getTime().toString();
        // var newfavourite = {"_id":id, "userId":userId, "title":favourite.title, "source_url":favourite.source_url, "image_url":favourite.image_url};
        // favourites.push(newfavourite);
        // res.json(newfavourite );
        favouriteModel
            .createFavourite(userId, favourite)
            .then(
                function (favourite) {
                    res.json(favourite);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function findAllFavouritesForUser(req, res) {
        var userId = req.params.userId;
        // var foundFavourites = [];
        // for(var i in favourites) {
        //     if (favourites[i].userId === userId) {
        //         foundFavourites.push(favourites[i]);
        //     }
        // }
        // res.json(foundFavourites);
        
        favouriteModel
            .findAllFavouritesForUser(userId)
            .then(
                function (favourites) {
                    res.json(favourites);
                },
                function (er) {
                    res.sendStatus(400);
                }
            );
    }

    function findFavouriteById(req, res) {
        var favouriteId = req.params.favouriteId;
        // for(var i in favourites) {
        //     if (favourites[i]._id === favouriteId) {
        //         res.send(favourites[i]);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
        favouriteModel
            .findFavouriteById(favouriteId)
            .then(
                function (favourite) {
                    res.json(favourite);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function updateFavourite(req, res) {
        var favouriteId = req.params.favouriteId;
        var favourite = req.body;
        // for(var i in favourites) {
        //     if (favourites[i]._id === favouriteId) {
        //         favourites[i].title = favourite.title;
        //         favourites[i].source_url = favourite.source_url;
        //         favourites[i].image_url = favourite.image_url;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
        favouriteModel
            .updateFavourite(favouriteId, favourite)
            .then(
                function (stat) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteFavourite(req, res) {
        var favouriteId = req.params.favouriteId;
        // for(var i in favourites) {
        //     if (favouritesv[i]._id === favouriteId) {
        //         favourites.splice(i,1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
        favouriteModel
            .deleteFavourite(stat)
            .then(
                function (favourite) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
};