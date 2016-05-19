/**
 * Created by asubbarayigowda on 5/17/16.
 */
(function() {
    angular
        .module("Websites", [])
        .controller("Website_list_controller", Website_list_controller)
        .controller("Website_edit_controller", Website_edit_controller)
        .controller("Website_new_controller", Website_new_controller)
        .controller("Page_list_controller", Page_list_controller)
        .controller("Widget_list_controller", Widget_list_controller);


    website_list = [
        {name: "Blogging App", description: "abcd"},
        {name: "Address Book App", description: "abcd"},
        {name: "Script Testing App", description: "abcd"},
        {name: "Blogger", description: "Blogger is a blog publishing service"}];

    function Website_list_controller($scope) {
        $scope.websites = website_list;
    }

    function Website_edit_controller($scope) {
        $scope.selected_website = website_list[3];
    }

    function Website_new_controller($scope) {
        $scope.createNewWebsite = function (name, description) {
            var newWebsite = {name: name, description: description};
            website_list.push(newWebsite);
            console.log(website_list);
        }
    }

    page_list = [
        {name: "Blog Post", title: "abcd"},
        {name: "Blogs", title: "abcd"},
        {name: "Home", title: "abcd"},
        {name: "About", title: "abcd"},
        {name: "Contact Us", title: "abcd"}];
    
    function Page_list_controller($scope) {
        $scope.pages = page_list;
    }

    widget_list = ["Header", "Label", "HTML", "Text Input", "Link", "Button", "Image", "Youtube", "Data Table", "Repeater"];

    function Widget_list_controller($scope) {
        $scope.widgets = widget_list;
    }
    
})();