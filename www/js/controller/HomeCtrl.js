app.controller('HomeCtrl', function($scope, $cordovaOauth, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    //$scope.logIn()
    $scope.oauthResponse="test";
  });

  $scope.logIn = function() {
    $cordovaOauth.github(APP_PUBLIC_KEY,
      APP_SECRET_KEY, [APP_EMAIL]).then(function(res) {
      $scope.oauthResponse = JSON.stringify(res);
    }, function(error) {
      console.log("Error -> " + error);
    });
  }
});
