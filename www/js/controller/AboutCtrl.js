app.controller('AboutCtrl', function ($scope,
                                     $ionicConfig,
                                     $cordovaOauth,
                                     $ionicPlatform,
                                     $cordovaSQLite,
                                     $q,
                                     DatabaseService) {

  $ionicPlatform.ready(function () {
    $scope.removeToken = function() {
      DatabaseService.removeUserToken();
    };
  });
});
