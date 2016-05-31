/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var apis = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };


        function createUser(newUser) {
            users.push(newUser);
        }

        function findUserById(userId) {
            var user = -1;
            for (var i in users) {
                if (users[i]._id === userId) {
                    user = users[i];
                }
            }
            return user;
        }

        function findUserByUsername(username) {
            var user = -1;
            for (var i in users) {
                if (users[i].username === username) {
                    user = users[i];
                }
            }
            return user;
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    //assuming username is not allowed to be changed
                    users[i].password = user.password;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    return;
                }
            }
        }
        return apis;
    }
})();
