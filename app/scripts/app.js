'use strict';
//angular.module('name of app', ['place any extra modules to load']){}
var angularD3App = angular.module('angularD3App', [])
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'views/main.html',
            controller:'AppCtrl'
        })
        .otherwise({
            redirectTo:'/'
        });
    }
]);
