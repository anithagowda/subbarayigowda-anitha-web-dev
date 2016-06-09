/**
 * Created by asubbarayigowda on 6/9/16.
 */
(function () {

    angular
        .module("OnlineKitchen")
        .controller("FollowingsController", FollowingsController);

    function FollowingsController(FollowingsService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.selectFollowing = selectFollowing;

        function init() {
            FollowingsService
                .findFollowingById($routeParams.uid)
                .then(
                    function (res) {
                        vm.followings = res.data;
                    },
                    function (err) {
                        vm.error = "Failed to retrieve your followings.."
                    }
                )
        }
        init();

        function selectFollowing(following) {
            //Go to followers profile
        }
    }
})();