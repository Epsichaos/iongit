app.controller('AboutCtrl', function ($scope,
                                      $location,
                                      $ionicConfig,
                                      $cordovaOauth,
                                      $ionicPlatform,
                                      $cordovaSQLite,
                                      $q,
                                      DatabaseService) {

  $ionicPlatform.ready(function () {
    /*
    $scope.redirectIfNotLoggedIn = function () {
      console.log(DatabaseService.getToken());
      if (DatabaseService.getToken() == null) {
        $location.url("/home");
      }
    };
*/
    $scope.removeToken = function () {
      DatabaseService.removeUserToken();
    };

  });
});
