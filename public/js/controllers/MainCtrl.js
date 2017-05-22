angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

    $scope.tagline = 'To the moon and back!';
    
    $scope.getRecords = function () {
        $http.get('/api/record') 
        .then(function(data) {
            $scope.records = data.data;
            //console.log("get finished");
        });
    };
    
    $scope.addRecord = function () {
        $http.post('/api/record', $scope.record)
        .then(function() {
            $scope.record = {};
            $scope.getRecords();
            //console.log("add finished");
        });
    };
    
    $scope.deleteRecord = function (record) {
        $http.delete('/api/record/' + record._id)
        .then(function(data) {
            $scope.getRecords();
            //console.log("delete finished" + record._id);
        });
    };
});