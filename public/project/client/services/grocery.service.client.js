/**
 * Created by asubbarayigowda on 6/14/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .factory("GroceryService", GroceryService);
    
    function GroceryService($http) {
        
        var apis = {
            createGrocery: createGrocery,
            findGroceriesByUserId : findGroceriesByUserId,
            findGroceryById: findGroceryById,
            updateGrocery: updateGrocery,
            deleteGroceryById : deleteGroceryById,
            deleteAllGroceriesByUserId : deleteAllGroceriesByUserId
        };
        
        return apis;
        
        function createGrocery(userId, name) {
            var newGrocery = {"_user": userId, "name": name};
            var url = "/api/user/"+userId+"/grocery";
            return $http.post(url, newGrocery);
        }
        
        function findGroceriesByUserId(userId) {
            var url = "/api/user/"+userId+"/grocery";
            return $http.get(url);
        }
        
        function findGroceryById(groceryId) {
            var url = "/api/grocery/"+groceryId;
            return $http.get(url);
        }
        
        function updateGrocery(groceryId, grocery) {
            var url = "/api/grocery/"+groceryId;
            return $http.put(url, grocery);
        }
        
        function deleteGroceryById(groceryId) {
            var url = "/api/grocery/?groceryId="+groceryId;
            return $http.delete(url);
        }
        
        function deleteAllGroceriesByUserId(userId) {
            var url = "/api/grocery/?userId="+userId;
            return $http.delete(url);
        }
    }
})();