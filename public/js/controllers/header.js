'use strict';

angular.module('mean.system').controller('HeaderController',
        [ '$scope', '$http', 'Global', function($scope, $http, Global) {

            $scope.global = Global;

            $scope.menu = [];

            $scope.isCollapsed = false;
        } ]);