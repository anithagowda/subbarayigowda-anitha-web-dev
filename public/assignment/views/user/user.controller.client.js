/**
 * Created by asubbarayigowda on 5/24/16.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    
    function LoginController($location) {
        //Bind the controller to this view_module var. Making changes to this var will be available everywhere controller is used
        var vm = this;
        
        vm.login = function (username, password) {

            //here i is just an index unlike java
            for(var i in users) {

                // === strict comparison without data casting
                if (users[i].username === username && users[i].password === password) {
                    //$location.url = everything after # in the url
                    $location.url("/profile/"+users[i]._id);
                }
                else {
                    vm.error = "Error!!"
                }
            }
        }
    }

    function ProfileController($routeParams) {
        var vm = this;
        var id = $routeParams.uid;
        var index = -1;
        vm.updateUser = updateUser;

        for(var i in users) {
            if (users[i]._id === id) {
                index = i;
                vm.user = users[i];
            }
        }

        function updateUser(newUser) {
            if (index != -1) {
                users[index].firstName = newUser.firstName;
                users[index].lastName = newUser.lastName;
            }
        }
    }


})();
