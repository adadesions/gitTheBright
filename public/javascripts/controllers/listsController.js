angular
.module('listsApp', [])
.controller('listCtrl', function($scope, $http){
  //Production
  // $http.get("http://thebright.in.th/db/api/vip")


  //Development
  $http.get("http://localhost:3333/db/api/vip")
  .success(function(res){
    $scope.data = res;
  });
});
