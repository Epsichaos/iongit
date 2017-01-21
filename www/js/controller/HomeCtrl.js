app.controller('HomeCtrl', function ($scope,
                                     $cordovaOauth,
                                     $ionicPlatform,
                                     $cordovaSQLite,
                                     $q,
                                     DatabaseService) {
  
  $ionicPlatform.ready(function () {
    /** --- INIT SCOPE FUNCTION --- **/
    $scope.init = function () {
      console.log('scope init');
      DatabaseService.createDB().then(function () {
        DatabaseService.createTable().then(function (success) {
          console.log("Database & table created");
          /*
          $scope.oauthResponse = DatabaseService.getUserToken();
          console.log($scope.oauthResponse);
          */
        }, function (error) {
          console.log(error);
        });
      });
    };

    /** --- GITHUB OAUTH SERVICE --- **/
    $scope.githubAuth = function () {
      console.log('github oauth');
      $cordovaOauth.github(APP_PUBLIC_KEY,
        APP_SECRET_KEY, [APP_EMAIL]).then(function (res) {
        //console.log(JSON.stringify(res));
        $scope.oauthResponse = JSON.stringify(res);
        DatabaseService.saveUserToken($scope.oauthResponse.access_token).then(function(success) {
          console.log(DatabaseService.getUserToken());
        }, function(error) {
          console.log(error);
        });
      }, function (error) {
        console.log("Error -> " + error);
      });
    };

    $scope.init();
  });
});
