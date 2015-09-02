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
  $facebookProvider.setPermissions("email, public_profile, user_posts, publish_actions, user_photos");    
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
    // Is user already logged into FB or not?
    $scope.isLoggedIn = false;
    // if not - fire the login function
    $scope.login = function() {
        $facebook.login().then(function() {
            $scope.isLoggedIn = true;
            refresh();
        });
    }
    // logout function
    $scope.logout = function() {
        $facebook.logout().then(function() {
            $scope.isLoggedIn = false;
            refresh();
        });
    }
    
    function refresh() {
        // call the facebook api on the logged in user profile
        $facebook.api('/me').then(function(response){
            // check if user is indeed logged in
            $scope.isLoggedIn = true;
            // greet the user
            $scope.welcomeMsg = 'Welcome ' + response.name;
            // make the userInfo available via response
            $scope.userInfo = response;
            // another api callback to fetch the user profile image
            $facebook.api('/me/picture').then(function(response){
                $scope.picture = response.data.url,
                    // api callback for permissions
                $facebook.api('/me/permissions').then(function(response){
                    $scope.permissions = response.data;
                    $facebook.api('/me/posts').then(function(response){
                        console.log(response.data);
                        $scope.posts = response.data;
                    });
                });
            })
        },
        // another function to show if there was an error logging in
        function(err){
            $scope.welcomeMsg = 'Please log in';
        });
    }
    
    // call the refresh function which provides a welcome msg
    refresh();
}]);
