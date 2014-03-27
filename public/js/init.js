'use strict';

angular.element(document).ready(function() {

    // Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') window.location.hash = '#!';

    // Then init the app
    angular.bootstrap(document, [ 'mean' ]);
});

angular.module('mean').run([ 'ParseSDK', function() {

    // parse instantiated throught service injection
} ]);