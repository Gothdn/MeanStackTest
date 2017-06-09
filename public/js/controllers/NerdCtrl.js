angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    $scope.init = function () {
    	$http.get('/api/permission') 
        .then(function(data) {
            $scope.permissions = data.data;

            $http.get('/api/role') 
	        .then(function(data) {
	            $scope.roles = data.data;
	            $scope.roles.forEach(function(role) {
	            	role.permissionTable = [];
	        		$scope.permissions.forEach(function(permission) {
	    				role.permissionTable.push(
	    					{name: permission.name,
    						value: permission.value,
    						has: $scope.roleHasPermission(role, permission)});
	        		});
	            });
	        });
        });
    };

    $scope.roleHasPermission = function (role, permission) {
    	return ((role.permission & permission.value) != 0);
    }

    $scope.getPermissionValue = function (role) {
    	var val = 0;
    	role.permissionTable.forEach(function(permission) {
    		val += permission.value * permission.has;
    	});
    	return val;
    }

    $scope.updateRolePermission = function (role) {
    	$http.post('/api/role/' + role._id, {permission: role.newPermission})
    	.then(function(data) {
        	$scope.init();
        });
    }

    $scope.addRole = function () {
    	console.log("eureka");
    	$http.post('/api/role', $scope.newRole)
        .then(function(data) {
        	console.log(data);
            $scope.init();
            //console.log("add finished");
        });
    }
});