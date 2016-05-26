/**
 * Created by asubbarayigowda on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var apis = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

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
            var user = -1;
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    user = users[i];
                }
            }
            return user;
        }

        function updateUser(userId, user) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    //assuming username is not allowed to be changed
                    users[i].password = user.password;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    return;
                }
            }
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
