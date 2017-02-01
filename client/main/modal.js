// controller for modal
var app = angular.module('gameMon.modal', ['ui.materialize', 'gameMon.selectedGame']);
app.controller('ModalController', function($scope, selectedGame){
  $scope.data = {};
  $scope.data.similarGames = {};
  for(var i = 0; i < 5; i++){
    $scope.data.similarGames[i] = 'Hello';
  };

  console.log(selectedGame);
});