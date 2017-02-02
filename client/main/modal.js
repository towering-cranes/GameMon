// controller for modal
var app = angular.module('gameMon.modal', ['ui.materialize', 'gameMon.selectedGame', 'gameMon.search', 'gameMon.gameCollection']);

app.controller('ModalController', ['$scope', 'SelectedGame', '$rootScope', 'giantBomb', 'UserCollection', function($scope, SelectedGame, $rootScope, giantBomb, UserCollection) {
  $scope.data = {};
  $scope.similarGames = [];

  // true for add, false for remove
  $scope.inCollection = false;

  $scope.addGameToCollection = function(giantBombId) {
    // UserCollection.addGameToCollection($rootScope.username, giantBombId, function(response) {
    //   console.log(response);
    // });
    console.log('inside add');
    $scope.inCollection = false;
  };
  $scope.removeGameFromCollection = function() {
    console.log('inside removed');
    $scope.inCollection = true;
  };

  // Game from search is different than collection
  $rootScope.$on('gameChangeSearch', function(event, game) {
    $scope.data = game;
    $scope.similarGames = [];
    $scope.data.image = game.image ? game.image.small_url : null;
    $scope.canAddToCollection = true;
    giantBomb.searchById(game.id, function(response) {
      var game = response.data;
      $scope.similarGames = game.similar_games;
    });
    $scope.canAdd = true;
  });

  $rootScope.$on('gameChangeCollection', function(event, game) {
    $scope.data = game;
    $scope.similarGames = [];
    // Set up same format as giantbomb results...
    $scope.data.name = game.title;
    $scope.data.deck = game.summary;
    $scope.similarGames = game.similarGames;
    $scope.canAdd = false;
  });
}]);