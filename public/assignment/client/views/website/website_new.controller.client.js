/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService, UserService) {
        var vm = this;
        var uid = $routeParams.uid;
        
        vm.uid = $routeParams.uid;
        vm.create_website = create_website;
        vm.website_list = website_list;

        function create_website(name, description) {
            if (name === "" || name == null ) {
                vm.error = "Name cannot be left empty";
                return;
            }
            
            var newWebsite = { "name": name, "description": description, "developerId": uid};
            WebsiteService
                .createWebsite(uid, newWebsite)
                .then(
                    function (res) {
                        website_list();
                        updateUser(res.data);
                    }
                );
        }
        
        function updateUser(newWebsite) {
            UserService
                .findUserById(uid)
                .then(function (res) {
                    var user = res.data;
                    if(user.websites) {
                        user.websites.push(newWebsite);
                    }
                    else {
                        user.websites = [newWebsite];
                    }

                    UserService.updateUser(uid, user);
                });
        }

        function website_list() {
            $location.url("/user/" + uid + "/website");
        }
    }
})();