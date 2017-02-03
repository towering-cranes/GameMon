var app = angular.module('gameMon.toggle', ['auth0'])
  .config(function(authProvider){
    authProvider.init({
      domain: window.authDomain,
      clientID: window.authClient
    });
  }).run(function(auth){
    auth.hookEvents();
  });


app.controller('LoginController', function(auth, $scope, $location, $http, $window){
  $scope.isLoggedIn = false;
  $scope.login = function(){
    auth.signin({}, function(profile, idToken, accessToken) {
      localStorage.setItem('profile', profile);
      localStorage.setItem('token', accessToken);
      $scope.isLoggedIn = true;
      $location.path('/gamemon');
    });
  }
  $scope.logout = function(){
    $scope.isLoggedIn = false;
    $window.location.href ='https://towering-cranes.auth0.com/v2/logout?returnTo=http%3A%2F%2F127.0.0.1%3A8080%2F%23%2F';
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
  }
});


// };
// var options = {
//   auth: {
//   responseType: 'token',
//   }
// };



// app.run(function(lock){
//   lock.on("authenticated", function(authResult) {
//     // Use the token in authResult to getUserInfo() and save it to localStorage
//     $rootScope.toggleSignup();
//     lock.getUserInfo(authResult.accessToken, function(error, profile) {
//       if (error) {
//         // Handle error
//         console.log("Error in getUserInfo ", error);
//         return;
//       }

//       console.log("About to set access token and profile");
//       localStorage.setItem('accessToken', authResult.accessToken);
//       localStorage.setItem('profile', JSON.stringify(profile));
//       showLoggedIn();
//     });
//   });
// });

// app.controller('SignupToggle', ['$localStorage', '$rootScope', '$location', function($localStorage, $rootScope, $location) {
//   // var options = {
//   //   auth: {
//   //   responseType: 'token',
//   //   }
//   // };
//   // var lock = new Auth0Lock(
//   //   window.authClient,
//   //   window.authDomain,
//   //   options//does the redirect url have to be wih %
//   // );

//   var showLoggedIn = function() {
//     // window.location.href = 'http://127.0.0.1:8080/#/gamemon';
//     //window.location.href = '/#/gamemon';
//     $location.path('/#/gamemon');
//   }

//   $rootScope.signUp = function(){
//     // Listening for the authenticated event

//     lock.show();

    // app.run(function(lock){
    //   lock.on("authenticated", function(authResult) {
    //     // Use the token in authResult to getUserInfo() and save it to localStorage
    //     $rootScope.toggleSignup();
    //     lock.getUserInfo(authResult.accessToken, function(error, profile) {
    //       if (error) {
    //         // Handle error
    //         console.log("Error in getUserInfo ", error);
    //         return;
    //       }

    //       console.log("About to set access token and profile");
    //       $localStorage.setItem('accessToken', authResult.accessToken);
    //       $localStorage.setItem('profile', JSON.stringify(profile));
    //       showLoggedIn();
    //     });
//       });
//     });
//   }

//   $rootScope.signOut = function(){
//     $rootScope.toggleSignup();
//     $localStorage.removeItem('accessToken');
//     $localStorage.removeItem('profile');
//     window.location.href = 'https://towering-cranes.auth0.com/v2/logout?returnTo=http%3A%2F%2F127.0.0.1%3A8080%2F%23%2F';
//   }

//   $rootScope.isLoggedIn = $rootScope.isLoggedIn || false;

//   $rootScope.toggleSignup = function() {
//     $rootScope.isLoggedIn = !$rootScope.isLoggedIn;
//     console.log('isLoggedIn ', $rootScope.isLoggedIn);
//   }

// }]);

//add authentication

// var lock = new Auth0Lock(
//   process.env.AUTH0_CLIENT_ID,
//   process.env.AUTH0_DOMAIN
// );

// document.getElementById('btn-login').addEventListener('click', function() {
//   lock.show();
// });

// document.getElementById('btn-logout').addEventListener('click', function() {
//   logOutUser();
// });

// function logOutUser() {
// }

// var token = localStorage.getItem('accessToken');
// if (token) {
//   console.log('has a token');
//   showLoggedIn();
// }