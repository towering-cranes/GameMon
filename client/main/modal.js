// controller for modal
var app = angular.module('gameMon.modal', ['ui.materialize', 'gameMon.selectedGame']);

app.controller('ModalController', ['$scope', 'SelectedGame', '$rootScope', function($scope, SelectedGame, $rootScope) {
  $scope.data = SelectedGame.currentGame;
  $scope.similarGames;
  $rootScope.$on('gameChange', function(event, game) {
    $scope.data = game;
    $scope.similarGames = game.similar_games;
  });
}]);