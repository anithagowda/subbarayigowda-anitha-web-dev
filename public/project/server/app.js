/**
 * Created by asubbarayigowda on 6/5/16.
 */
module.exports = function (app, request) {
    require("./services/food2fork.service.server.js")(app, request);
    require("./services/user.service.server.js")(app);
    require("./services/favourites.service.server.js")(app);
};