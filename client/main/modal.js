// controller for modal
  var app = angular.module('gameMon.modal', ['ui.materialize', 'gameMon.gameCollection']);
app.controller('ModalController', function($scope, userCollectionData){
  $scope.data = {};
  $scope.data.similarGames = {};
  for(var i = 0; i < 5; i++){
    $scope.data.similarGames[i] = 'Hello';
  };
  setTimeout(function() {
    console.log(userCollectionData.getCollectionData())
  }, 1000); // Bad way to get data if server is slow for some reason
});