var app = angular.module('phonebook', ['ngMaterial']);
app.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('MyTheme')
        .primaryPalette('teal', {
            'hue-1' : '50',
            'hue-2': '300'
    })
});

app.controller('PhonebookController', function($scope, $mdDialog){
            $scope.persons = null;
            $scope.persons=window.localStorage.getItem('persons') ? JSON.parse(localStorage.getItem('persons')) : [];
        $scope.Add=function (ev) {
            if($scope.firstName==null ||$scope.lastName==null || $scope.phoneNumber==null ){
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#wrapper')))
                        .clickOutsideToClose(true)
                        .title('Hi!')
                        .textContent('It seems to me, that you didn`t fill all fields)')
                        .ok('OK!')
                        .targetEvent(ev)

                );

            }
            else {
                var newContact = ({
                    "name": $scope.firstName,
                    "sname": $scope.lastName,
                    "phone": $scope.phoneNumber,
                    "remove": false
                });
                $scope.persons.push(newContact);
                window.localStorage.setItem('persons', JSON.stringify($scope.persons));
            }
        }
        $scope.Remove=function(){
            var removeContact=$scope.persons;
            $scope.persons=[];
            angular.forEach(removeContact, function(person){
                if(!person.remove){
                    $scope.persons.push(person);
                }
            });
            window.localStorage.setItem('persons',JSON.stringify($scope.persons));
        };

});



