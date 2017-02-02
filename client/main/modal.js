// controller for modal
var app = angular.module('gameMon.modal', ['ui.materialize', 'gameMon.selectedGame', 'gameMon.search']);

app.controller('ModalController', ['$scope', 'SelectedGame', '$rootScope', 'giantBomb', function($scope, SelectedGame, $rootScope, giantBomb) {
  $scope.data = {};
  $scope.similarGames = [];

  // Game from search is different than collection
  $rootScope.$on('gameChangeSearch', function(event, game) {
    $scope.data = game;
    $scope.similarGames = [];
    $scope.data.image = game.image.small_url;
    giantBomb.searchById(game.id, function(response) {
      var game = response.data;
      $scope.similarGames = game.similar_games;
    });
  });

  $rootScope.$on('gameChangeCollection', function(event, game) {
    $scope.data = game;
    $scope.similarGames = [];
    // Set up same format as giantbomb results...
    $scope.data.name = game.title;
    $scope.data.deck = game.summary;
    $scope.similarGames = game.similarGames;
  });
}]);