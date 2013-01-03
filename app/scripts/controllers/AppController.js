'use strict';

angularD3App.controller('AppCtrl', function($scope) {
    $scope.name = "angular + d3";
    $scope.editedTodo = "end of slider controls";
    //generic clone object m
    $scope.cloneObj = function(_obj){
        console.log(_obj)
        if (_obj == null || typeof(_obj) != 'object')
            return _obj;

        var temp = _obj.constructor(); // changed

        for (var key in _obj){
            temp[key] = this.cloneObj(_obj[key]);
        }
        return temp;
    };

    //Data Model
    $scope.d1 = [
        {v:5},
        {v:10},
        {v:70},
        {v:6},
        {v:40},
        {v:45},
        {v:80},
        {v:30},
        {v:25}
    ];

    $scope.d2 = [
        {v:25},
        {v:0},
        {v:50},
        {v:60},
        {v:40},
        {v:5},
        {v:30},
        {v:30},
        {v:50}
    ];

});

