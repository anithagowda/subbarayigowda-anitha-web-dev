/**
 * Created by asubbarayigowda on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService, UserService) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        vm.uid = $routeParams.uid;
        vm.update_website = update_website;
        vm.website_list = website_list;
        vm.delete_website = delete_website;

        function init() {
            WebsiteService
                .findWebsiteById(wid)
                .then(function (res) {
                    vm.website = res.data;
                });
        }
        init();
       
        function update_website(website) {
            if (website.name === "" || website.name == null) {
                vm.error = "Name cannot be left empty";
                return;
            }
            
            WebsiteService
                .updateWebsite(wid, website)
                .then(
                    function (res) {
                        website_list();
                    },
                    function (err) {
                        vm.error = "Failed to update website";
                    }
                );

            UserService
                .findUserById($routeParams.uid)
                .then(function (res) {
                    var user = res.data;
                    for (var i in user.websites) {
                        if(user.websites[i]._id === wid) {
                            var edit = user.websites.splice(i,1);
                            edit.name = website.name;
                            edit.description = website.description;
                            user.websites.push(edit);
                            UserService.updateUser($routeParams.uid, user);
                            return;
                        }
                    }
                });
        }

        function website_list() {
            $location.url("/user/" + uid + "/website");
        }

        function delete_website() {
            WebsiteService
                .deleteWebsite(wid)
                .then(
                    function (res) {
                        website_list();
                    },
                    function (err) {
                        vm.error = "Failed to delete website";
                    }
                );

            UserService
                .findUserById($routeParams.uid)
                .then(function (res) {
                    var user = res.data;
                    for (var i in user.websites) {
                        if(user.websites[i] === wid) {
                            user.websites.splice(i,1);
                            UserService.updateUser($routeParams.uid, user);
                            return;
                        }
                    }
                });
        }
    }
})();