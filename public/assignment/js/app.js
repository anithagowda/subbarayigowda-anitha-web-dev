/**
 * Created by asubbarayigowda on 5/17/16.
 */
angular
    .module("Websites", [])
    .controller("Website_list_controller", Website_list_controller)
    .controller("Website_edit_controller", Website_edit_controller)
    .controller("Website_new_controller", Website_new_controller);

website_list = [
    {name:"Blogging App", description:"abcd"},
    {name:"Address Book App", description:"abcd"},
    {name:"Script Testing App", description:"abcd"},
    {name:"Blogger", description:"Blogger is a blog publishing service"}];

function Website_list_controller($scope) {
        $scope.websites = website_list;
}

function Website_edit_controller($scope) {
    $scope.selected_website = website_list[3];
}

function Website_new_controller($scope) {
    $scope.createNewWebsite = function (name, description) {
        var newWebsite = {name:name, description:description};
        website_list.push(newWebsite);
        console.log(website_list);
    }
}