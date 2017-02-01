// controller for game collection
var app = angular.module('gameMon.search', ['ui.materialize']);
app.controller('SearchController', function($scope, giantBomb) {
  $scope.search = '';
  $scope.searchResults = [];

  $scope.searchForGames = function() {
    giantBomb.searchByTerm($scope.search, function(res) {
      $scope.searchResults = res.data;
      $scope.search = '';
      $scope.searchForm.$setPristine();
    });
  };

});

app.factory('giantBomb', ['$http', function($http) {
  var searchTypes = {};

  searchTypes.searchByTerm = function(searchTerm, callback) {
    $http.get('/games/search/keyword/' + searchTerm)
      .then(function(response) {
        callback(response);
      }, failCallback);
  };

  searchTypes.searchById = function(gameId, callback) {
    $http.get('/games/search/id/' + gameId)
      .then(function(response) {
        callback(response);
      }, failCallback);
  };

  var failCallback = function(response) {
    console.log(response);
  };

  return searchTypes;
}]);