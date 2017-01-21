app.controller('HomeCtrl', function ($rootScope,
                                     $scope,
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
        DatabaseService.createTable().then(function () {
          DatabaseService.getUserToken(function(token) {
            DatabaseService.setToken(token.userToken);
            $scope.token = DatabaseService.getToken();
          });
        }, function (error) {
          console.log(error);
        });
      });
    };

    /** --- GITHUB OAUTH SERVICE --- **/
    $scope.githubAuth = function () {
      $cordovaOauth.github(APP_PUBLIC_KEY,
        APP_SECRET_KEY, [APP_EMAIL]).then(function (res) {
        DatabaseService.saveUserToken(res.access_token).then(function () {

        }, function (error) {
          console.log("Error -> " + error);
        });
      }, function (error) {
        console.log("Error -> " + error);
      });
    };

    $scope.init();
  });
});
