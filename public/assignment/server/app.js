/**
 * Created by asubbarayigowda on 5/31/16.
 */

//passing an instance of express which is used to create web services
module.exports = function (app) {
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);

    //Eg:
    // app.get("/say:something", function (req, res) {
    //     var msg = req.params.something;
    //     res.send({message: msg});
    // });
};