/**
 * Created by asubbarayigowda on 6/5/16.
 */
module.exports = function (app, request) {
    app.get("/top_recipes", getTopRecipes);
    app.get("/search/:ingredients", searchRecipes);

    var food2fork_key = "ad9135a7fe9d7d36eb71c904328ccd66";
    var baseUrl = "http://food2fork.com/api/search?key="+food2fork_key+"&format=json&callback=JSON_CALLBACK";

    function getTopRecipes(req, res) {
        request(baseUrl, function (err, resp, body) {
            body = JSON.parse(body);
            res.send(body.recipes);
        });
    }

    function searchRecipes(req, res) {
        var ingredients = req.params.ingredients;
        var url = baseUrl+"&q="+ingredients;
        request(url, function (err, resp, body) {
            body = JSON.parse(body);
            res.json(body.recipes);
        })
    }
};