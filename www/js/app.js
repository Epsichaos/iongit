var app = angular.module('iongit', ['ionic', 'ngCordova', 'ngCordovaOauth', 'db.service']);

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

//routes
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home/home.html',
      controller: 'HomeCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html',
      controller: 'AboutCtrl'
    });
  $urlRouterProvider.otherwise('home');
});
