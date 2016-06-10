/**
 * Created by asubbarayigowda on 6/5/16.
 */
module.exports = function (app, request) {
    
    var models = require("./../model/models.server")();
    
    require("./services/food2fork.service.server.js")(app, request);
    require("./services/user.service.server.js")(app, models);
    require("./services/favourites.service.server.js")(app, models);
    require("./services/followers.service.server.js")(app, models);
    require("./services/followings.service.server.js")(app, models);
};