app.controller('HomeCtrl', function ($scope,
                                     $ionicConfig,
                                     $cordovaOauth,
                                     $ionicPlatform,
                                     $cordovaSQLite,
                                     $q,
                                     DatabaseService) {

  $ionicPlatform.ready(function () {

    /** --- INIT SCOPE FUNCTION --- **/
    $scope.init = function () {
      $scope.infos = true;
      $scope.repos = false;
      $scope.events = false;
      $ionicConfig.tabs.position("bottom");
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

    $scope.isLogged = function() {
      return DatabaseService.getToken() != null;
    };

    $scope.showTabs = function (str) {
      console.log(str);
      if(str == "infos") {
        $scope.infos = true;
        $scope.repos = false;
        $scope.events = false;
      } else if(str == "repos") {
        $scope.infos = false;
        $scope.repos = true;
        $scope.events = false;
      } else if(str == "events") {
        $scope.infos = false;
        $scope.repos = false;
        $scope.events = true;
      }
    };

    $scope.init();
  });
});
