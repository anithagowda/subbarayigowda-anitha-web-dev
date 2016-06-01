/**
 * Created by asubbarayigowda on 5/31/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;

        function searchPhotos(searchText) {
            console.log(searchText);
            FlickrService.searchPhotos(searchText);
        }
    }
})();