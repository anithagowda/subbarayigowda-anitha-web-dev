/**
 * Created by asubbarayigowda on 5/31/16.
 */

//passing an instance of express which is used to create web services
module.exports = function (app) {
    
    var models = require("./../model/models.server")();
    
    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);

    //Eg:
    // app.get("/say:something", function (req, res) {
    //     var msg = req.params.something;
    //     res.send({message: msg});
    // });
};