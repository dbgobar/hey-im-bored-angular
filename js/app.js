angular
  .module("heyimbored", ["ui.router", "checklist-model", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("IndexController", ["$scope",
  "$state",
  "$http",
  IndexControllerFunction])
  .controller("ShowController", [
  "$scope",
  "EventFactory", "$state",
  ShowControllerFunction])
  .factory("EventFactory", [
    "$resource",
    EventFactoryFunction
  ])

  function EventFactoryFunction($resource) {
    return $resource("http://localhost:4001/api/events", {}, {
      update: {method: "PUT"}
    })
  }

function RouterFunction($stateProvider) {
  $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "/js/ng-views/index.html",
      controller: "IndexController",
      controllerAs: "vm"
    })
    .state("show",{
      url: "/events",
      templateUrl: "/js/ng-views/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
}


function IndexControllerFunction($scope, $state, $http) {

  $scope.categories = [
    'Music',
    'Comedy',
    'Sports',
    'Arts',
    'Food',
    'Family'
  ];

  $scope.postal_code = []

  $scope.user = {
    categories: [],
    postal_code: []
  };


  this.create = function(user){
    // send this object to API and data.categories and data.postal_code
    $http({
      url: "http://localhost:4001/",
      method: "post",
      data: user
    }).then(() => {
      $state.go("show", {reload: true});
    });
      // $http.get("http://localhost:4001")

  }
}


function ShowControllerFunction($scope, EventFactory, $state) {
  $scope.event = EventFactory.get({}, function(){
    console.log($scope.event)

  })
  // this.event.then(function(err, result){
  //   console.log(result)
  // })

  $scope.EventValid = true;

  this.destroy = function(event){
    $scope.event.$delete(event).then(function(){
    $scope.event = EventFactory.get({}, function(){
       let validation = ($scope.event.title)
       console.log(validation)
       if (validation == true){
         console.log("true");
       }
       else{
         console.log("false")
          $scope.EventValid = false;
       }
    })
    $state.go("show")
    })
  }

  this.searchAgain = function(){
    $state.go("index");
  }

}
