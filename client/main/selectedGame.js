// module with factory to pass game info
var app = angular.module('gameMon.selectedGame', ['gameMon.search', 'gameMon.modal']);

app.factory('SelectedGame', ['$http', 'giantBomb', '$rootScope', function($http, giantBomb, $rootScope) {
  var currentGame = {};
  var setCurrentGame = function(id) {
    giantBomb.searchById(id, function(res) {
      currentGame = res.data;
      $rootScope.$emit('gameChange', currentGame);
    });
  };
  var getCurrentGame = function() {
    return currentGame;
  };
  return {
    setCurrentGame: setCurrentGame,
    getCurrentGame: getCurrentGame,
  };
}]);