app.controller('HomeCtrl', function ($scope,
                                     $ionicConfig,
                                     $cordovaOauth,
                                     $ionicPlatform,
                                     $cordovaSQLite,
                                     $q,
                                     DatabaseService) {

  $ionicPlatform.ready(function () {

    $scope.state = "";

    /** --- INIT SCOPE FUNCTION --- **/
    $scope.init = function () {
      $scope.state = "login";
      $ionicConfig.tabs.position("bottom");
      DatabaseService.createDB().then(function () {
        DatabaseService.createTable().then(function () {
          DatabaseService.getUserToken(function(token) {
            DatabaseService.setToken(token.userToken);
            if(DatabaseService.getToken() != null) {
              $scope.state = "view";
            }
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
          $scope.state = "view";
        }, function (error) {
          console.log("Error -> " + error);
        });
      }, function (error) {
        console.log("Error -> " + error);
      });
    };

    $scope.showTabs = function() {
      if($scope.state == "view") {
        return true;
      } else if($scope.state == "login") {
        return false;
      }
    };

    $scope.showLogin = function() {
      if($scope.state == "view") {
        return false;
      } else if($scope.state == "login") {
        return true;
      }
    };

    $scope.init();
  });
});
