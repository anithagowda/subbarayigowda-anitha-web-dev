/**
 * Created by asubbarayigowda on 6/5/16.
 */
module.exports = function (app, request) {
    app.get("/top_recipes", getTopRecipes);

    var food2fork_key = "ad9135a7fe9d7d36eb71c904328ccd66";
    var baseUrl = "http://food2fork.com/api/search?key="+food2fork_key+"&format=json&callback=JSON_CALLBACK";

    function getTopRecipes(req, res) {
        request(baseUrl, function (err, resp, body) {
            body = JSON.parse(body);
            res.send(body.recipes);
        });
    }
};