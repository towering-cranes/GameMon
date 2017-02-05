var app = angular.module('gameMon.toggle', ['auth0'])
  .config(function(authProvider){
    authProvider.init({
      domain: 'towering-cranes.auth0.com',
      clientID: 'QfGpmdzDtxUhduPejeKN8P1TadDU8OqG'
    });
  }).run(function(auth){
    auth.hookEvents();
  });

app.controller('LoginController', function(auth, $scope, $location, $http, $window, $rootScope, $route) {
  $rootScope.isLoggedIn = localStorage.getItem('profile') ? true : false;
  $scope.login = function(){
    auth.signin({}, function(profile, idToken, accessToken) {
      localStorage.setItem('profile', profile.user_id);
      localStorage.setItem('token', accessToken);
      $rootScope.isLoggedIn = true;
      if ($location.path() === '/gamemon') {
        $route.reload();
      } else {
        $location.path('/gamemon');
      }
    });
  }
  $scope.logout = function(){
    $rootScope.isLoggedIn = false;
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    $window.location.href = 'https://towering-cranes.auth0.com/v2/logout?returnTo=http%3A%2F%2F138.68.224.84';
  }
});