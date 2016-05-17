/**
 * Created by asubbarayigowda on 5/17/16.
 */
angular
    .module("Website_list", [])
    .controller("Website_list_controller", Website_list_controller);

function Website_list_controller($scope) {
        $scope.websites = [
            "Blogging App",
            "Address Book App",
            "Script Testing App",
            "Blogger"
        ];
}
