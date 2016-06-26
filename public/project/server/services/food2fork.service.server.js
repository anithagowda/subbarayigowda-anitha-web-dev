/**
 * Created by asubbarayigowda on 6/5/16.
 */
module.exports = function (app, request) {
    app.get("/top_recipes", getTopRecipes);
    app.get("/search/:ingredients", searchRecipes);
    app.get("/get/:rId", getRecipe);

    var food2fork_key = "ad9135a7fe9d7d36eb71c904328ccd66";
    var searchUrl = "http://food2fork.com/api/search?key="+food2fork_key+"&format=json&callback=JSON_CALLBACK";
    var getUrl = "http://food2fork.com/api/get?key="+food2fork_key+"&format=json&callback=JSON_CALLBACK";

    function getTopRecipes(req, res) {
        request(searchUrl, function (err, resp, body) {
            if (resp.statusCode === 500) {
                res.status(400).send(resp.statusMessage);
                return;
            }
            body = JSON.parse(body);
            res.send(body.recipes);
        });
    }

    function searchRecipes(req, res) {
        var ingredients = req.params.ingredients;
        var url = searchUrl+"&q="+ingredients;
        request(url, function (err, resp, body) {
            if (resp.statusCode === 500) {
                res.status(400).send(resp.statusMessage);
                return;
            }
            body = JSON.parse(body);
            res.json(body.recipes);
        });
    }

    function getRecipe(req, res) {
        var rId = req.params.rId;
        var url = getUrl+"&rId="+rId;
        request(url, function (err, resp, body) {
            if (resp.statusCode === 500) {
                res.status(400).send(resp.statusMessage);
                return;
            }
            body = JSON.parse(body);
            res.json(body.recipe);
        });
    }
};