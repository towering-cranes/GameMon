//add authentication

// var lock = new Auth0Lock(
//   process.env.AUTH0_CLIENT_ID,
//   process.env.AUTH0_DOMAIN
// );
var options = {
  auth: {
  responseType: 'token',
  }
};
var lock = new Auth0Lock(
  window.authClient,
  window.authDomain,
  options//does the redirect url have to be wih %
);


// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  showLoggedIn();
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      console.log("Error in getUserInfo ", error);
      return;
    }
    console.log("About to set access token and profile");
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));

  });
});

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});

document.getElementById('btn-logout').addEventListener('click', function() {
  logOutUser();
});

function logOutUser() {

  localStorage.removeItem('accessToken');
  localStorage.removeItem('profile');
  window.location.href = 'https://towering-cranes.auth0.com/v2/logout?returnTo=http%3A%2F%2F127.0.0.1%3A8080%2F%23%2F';

}

var token = localStorage.getItem('accessToken');
if (token) {
  console.log('has a token');
  showLoggedIn();
}

function showLoggedIn() {
  var currentPath = window.location.href;//full current url
  console.log('Replacement path ', 'http://127.0.0.1:8080/#/gamemon');
  // window.location.href = 'http://127.0.0.1:8080/#/gamemon';
  window.location.href = '/#/gamemon';
}