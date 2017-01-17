app.controller('HomeCtrl', function($scope, $cordovaOauth, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    //$scope.logIn()
    $scope.oauthResponse="test";
  });

  $scope.logIn = function() {
    $cordovaOauth.github("5dfaf0e5463394ad10c8",
      "de05e6c59c3bd6d353f3a1ea82996dc4e62622a3",
      ["hmmmleviosaaa@gmail.com"]).then(function(res) {
      $scope.oauthResponse = JSON.stringify(res);
    }, function(error) {
      console.log("Error -> " + error);
    });
  }
});
