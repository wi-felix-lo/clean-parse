'use strict';

angular.module('mean.system').controller('IndexController',
        [ '$scope', 'Global', 'ParseCloudRun', 'ParseObject', function($scope, Global, ParseCloudRun, ParseObject) {

            $scope.global = Global;
        } ]);
