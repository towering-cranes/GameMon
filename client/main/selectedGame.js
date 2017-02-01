// module with factory to pass game info
var app = angular.module('gameMon.selectedGame', ['gameMon.search']);

app.factory('selectedGame', ['$http', 'giantBomb', function($http, giantBomb) {
  var currentGame = {};
  var setCurrentGame = function(id) {
    giantBomb.searchById(id, function(game) {
      currentGame = game;
    });
  };
  var getCurrentGame = function() {
    return currentGame;
  };
  return {
    setCurrentGame: setCurrentGame,
    getCurrentGame: getCurrentGame
  };
}]);