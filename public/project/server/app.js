/**
 * Created by asubbarayigowda on 6/5/16.
 */
module.exports = function (app, request) {
    require("./services/food2fork.server.service.js")(app, request);
};