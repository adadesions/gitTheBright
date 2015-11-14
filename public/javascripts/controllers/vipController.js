angular
.module('vipApp', ['ngRoute'])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider){
    $routeProvider
      .when('/vip/:tbid', {
        templateUrl: 'vip.jade',
        controller: 'vipCtrl',
        controllerAs: 'vip'
      });
    $locationProvider.html5Mode(true);
}])
.controller('vipCtrl', ['$route', '$routeParams', '$location',
  function($route, $routeParams, $location){
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.name = "ADA";
}])
