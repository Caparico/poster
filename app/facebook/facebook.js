'use strict';
// The ngSocial module with routing instructions for ngRoute
angular.module('ngSocial.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

// configure the facebook application against Facebook - App ID + permissions
.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1738263123067679');
  $facebookProvider.setPermissions("email", "public_profile", "user_posts", "publish_actions", "user_photos");    
})

// load the ngFabook SDK
.run(function($rootScope){
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
    // this controller check if the user is already logged into FB
    $scope.isLoggedIn = false;
    // if not, it will fire the login popup
    $scope.login = function() {
        $facebook.login().then(function() {
            console.log('Logged in...');
        });
    }
}]);
