/**
 * Created by asubbarayigowda on 5/17/16.
 */
//IIFE : Immediately invoked function expression
(function() {
    angular
        .module("WebAppMaker", ['ngRoute']);

    module.exports = function (app) {
        require("./services/user.service.server.js")(app);
        require("./services/website.service.server.js")(app);
        require("./services/page.service.server.js")(app);
        require("./services/widget.service.server.js")(app);
    }
})();