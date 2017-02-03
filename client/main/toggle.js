var app = angular.module('gameMon.toggle', ['auth0'])
  .config(function(authProvider){
    authProvider.init({
      domain: window.authDomain,
      clientID: window.authClient
    });
  }).run(function(auth){
    auth.hookEvents();
  });


app.controller('LoginController', function(auth, $scope, $location, $http, $window){
  $scope.isLoggedIn = false;
  $scope.login = function(){
    auth.signin({}, function(profile, idToken, accessToken) {
      localStorage.setItem('profile', profile);
      localStorage.setItem('token', accessToken);
      $scope.isLoggedIn = true;
      $location.path('/gamemon');
    });
  }
  $scope.logout = function(){
    $scope.isLoggedIn = false;
    $window.location.href ='https://towering-cranes.auth0.com/v2/logout';
    $location.path('/');
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
  }
});