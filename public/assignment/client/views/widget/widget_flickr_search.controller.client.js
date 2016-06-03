/**
 * Created by asubbarayigowda on 5/31/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService, WidgetService) {
        var vm = this;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (res) {
                    var data = res.data.replace("jsonFlickrApi(","");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            console.log(url);
            // var newWidget = { "widgetType": "IMAGE", "pageId": pageId, "width": 100%, "url": url};
            // WidgetService
            //     .updateWidget(wgid, newWidget)
            //     .then(function (res) {
            //
            //     });
        }
    }
})();