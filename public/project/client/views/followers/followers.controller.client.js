
/**
 * Created by asubbarayigowda on 6/9/16.
 */
(function () {
    
    angular
        .module("OnlineKitchen")
        .controller("FollowersController", FollowersController);
    
    function FollowersController(FollowersService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.selectFollower = selectFollower;

        function init() {
            FollowersService
                .findFollowerById($routeParams.uid)
                .then(
                    function (res) {
                        vm.followers = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve your followers.."
                    }
                )
        }
        init();

        function selectFollower(recipe) {
            //Go to followers profile
        }
    }
})();