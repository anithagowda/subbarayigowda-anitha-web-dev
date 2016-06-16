/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("OnlineKitchen")
        .factory("UserService", UserService);

    function UserService($http) {

        var apis = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserStartingWithUsername: findUserStartingWithUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            login: login,
            logout : logout,
            loggedIn: loggedIn,
            register: register
        };


        function createUser(username, password) {
            var user = {username:username, password:password };
            return $http.post("/api/user", user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }
        
        function findUserStartingWithUsername(username) {
            var url = "/api/user?search="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url);
        }
        
        function login(username, password) {
            var user = {username:username, password:password };
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        function register(username, password) {
            var user = {username:username, password:password };
            return $http.post("/api/register", user);
        }
        return apis;
    }
})();
