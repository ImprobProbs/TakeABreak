(function() {
  const APP = angular.module('zen', [
    'zen.home',
    'zen.journey',
    'zen.login',
    'zen.services',
    'zen.auth',
    'zen.settings',
    'ngRoute'
  ]);

  APP.controller('MainCtrl', function($scope, $location, $window, Auth) {
    $scope.isAuthorized = Auth.isAuth;
    $scope.signOut = Auth.signout;
    $scope.ghost = function () {};
  });

  APP.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/login', {
        templateUrl: '/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/journey', {
        templateUrl: '/journey/journey.html',
        controller: 'JourneyCtrl'
      })
      .when('/settings', {
        templateUrl: '/settings/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/',
      });

      $locationProvider.hashPrefix('');
  });

  APP.run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if (!Auth.isAuth()) {
        $location.path('/');
      }
    });
  });

})();
