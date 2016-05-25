/**
 * Created by asubbarayigowda on 5/24/16.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController() {
        //Bind the controller to this view_module var. Making changes to this var will be available everywhere controller is used
        var vm = this;

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        
        vm.login = function (username, password) {

            //here i is just an index unlike java
            for(var i in users) {

                // === strict comparison without data casting
                if (users[i].username === username && users[i].password === password) {
                    
                }
                else {
                    vm.error = "Error!!"
                }
            }
        }
    }
})();
