// controller for game collection
var app = angular.module('gameMon.gameCollection', ['ui.materialize', 'gameMon.selectedGame']);
app.controller('GameCollectionController', function($scope, UserCollection, SelectedGame) {
  $scope.data = {};
  $scope.username = 'kevin';
  //Store games in corresponding objects
  $scope.platforms = {};
  $scope.genres = {};
  //Store just names in array
  $scope.platformArr = [];
  $scope.genreArr = [];
  //For filtering
  $scope.setFilter = function(val) {
    $scope.current = val;
  }
  $scope.current = '';

  $scope.selectGame = function(game) {
    SelectedGame.setCurrentGameFromCollection(game);
    // console.log('get game from gameCollection', SelectedGame.getCurrentGame());
  };

  UserCollection.getUserCollection($scope.username, function(res) {
    //Gets user collection, stores platforms and games in $scope.platforms
    $scope.data.games = res.data;
    for (var i = 0; i < $scope.data.games.length; i++) {
      var game = $scope.data.games[i];
      //Platforms
      for (var j = 0; j < game.platforms.length; j++) {
        var platform = game.platforms[j].name;
        if (!$scope.platforms.hasOwnProperty(platform)) {
          $scope.platforms[platform] = [game];
          $scope.platformArr.push(platform);
        } else {
          $scope.platforms[platform].push(game);
        }
      }
      //Genres
      for (var k = 0; k < game.genres.length; k++) {
        var genre = game.genres[k].name;
        if (!$scope.genres.hasOwnProperty(genre)) {
          $scope.genres[genre] = [game];
          $scope.genreArr.push(genre);
        } else {
          $scope.genres[genre].push(game);
        }
      }
    }
    //console.log($scope.data.games);
  });

  //TODO: Add/remove game to collection after search and modal is implemented


  // userCollection.addGameToCollection($scope.username, 24024, function(res) {
  //   console.log(res.data);
  // });

  // userCollection.removeGameFromCollection($scope.username, 24024, function(res) {
  //   console.log(res.data);
  // });
});

app.factory('UserCollection', ['$http', function($http) {
  var db = {};

  db.getUserCollection = function(username, callback) {
    $http.get('/users/games/' + username)
      .then(function(response) {
        callback(response);
      }, failCallback);
  };

  db.addGameToCollection = function(username, gameId, callback) {
    // Get game obj from game id
    $http.get('/games/search/id/' + gameId)
      .then(function(response) {

        // Attach user to game object for back end processing
        var game = response.data;
        game.username = username;

        $http.post('/games', game)
          .then(function(response) {
            callback(response);
          }, failCallback);

      }, failCallback);
  };

  db.removeGameFromCollection = function(username, gameId, callback) {
    $http.get('/games/search/id/' + gameId)
      .then(function(response) {

        // Attach user to game object for back end processing
        var game = response.data;
        game.username = username;
        console.log(game);

        $http({
          url: '/games',
          method: 'DELETE',
          data: game,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        })
          .then(function(response) {
            callback(response);
          }, failCallback);

      }, failCallback);
  };

  var failCallback = function(response) {
    console.log(response);
  };

  return db;
}]);


//SAMPLE CUSTOM FILTER
// app.filter('tagFilter', function() {
//   return function (items, classFilter) {
//     if (!items) {
//       return;
//     }
//     var filtered = [];
//     for (var i = 0; i<Object.keys(items).length; i++) {
//       var champ = items[Object.keys(items)[i]];
//       if(champ.tags.indexOf(classFilter) !== -1 || classFilter === '') {
//         filtered.push(champ);
//       }
//     }
//     return filtered;
//   };
// });

//Platform and Genre filter
app.filter('collectionFilter', function() {
  return function(items, filterOpt) {
    console.log('filterOpt is ', filterOpt);
    if (!items) {
      return;
    } else if (filterOpt === '') {
      return items;
    } else {
      console.log('filtering');
      var filtered = [];
      for(var i = 0; i < items.length; i++) {
        var genres = items[i].genres;
        //Check if genre matches filter
        for (var j = 0; j < genres.length; j++) {
          if(genres[j].name === filterOpt) {
            filtered.push(items[i]);
          }
        }
        var platforms = items[i].platforms;
        //Check if platform matches filter
        for (var j = 0; j < platforms.length; j++) {
          if(platforms[j].name === filterOpt) {
            filtered.push(items[i]);
          }
        }
      }
      return filtered;
    }
  };
});

//Name filter... and franchise?
app.filter('nameFilter', function() {


});