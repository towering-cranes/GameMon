angular.module('gamemon', [
  'gameMon.gameCollection',
  'gameMon.search',
  'gameMon.modal',
  'gameMon.toggle',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/gamemon', {
    templateUrl: 'main/main.html',
    controller: 'LoginController'
  })
  .when('/signup', {
    templateUrl: 'user/signup.html'
  })
  .otherwise({redirectTo: '/'});
});