app.controller('HomeCtrl', function($scope, $cordovaOauth, $ionicPlatform, $cordovaSQLite, DatabaseService) {
  $ionicPlatform.ready(function() {
    $scope.init = function() {
      console.log('scope init');
      DatabaseService.createTable();
      $scope.oauthResponse = DatabaseService.getUserToken();
    };

    $scope.githubAuth = function() {
      console.log('github oauth');
      $cordovaOauth.github(APP_PUBLIC_KEY,
        APP_SECRET_KEY, [APP_EMAIL]).then(function(res) {
        $scope.oauthResponse = JSON.stringify(res);
        DatabaseService.saveUserToken(JSON.stringify(res).access_token);
      }, function(error) {
        console.log("Error -> " + error);
      });
    };

    $scope.init();
  });
});
