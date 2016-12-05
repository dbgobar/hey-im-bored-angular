angular
  .module("heyimbored", ["ui.router", "checklist-model"])
  .config(["$stateProvider", RouterFunction])
  .controller("IndexController", ["$scope", IndexControllerFunction])

function RouterFunction($stateProvider) {
  $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "/js/ng-views/index.html",
      controller: "IndexController",
      controllerAs: "vm"
    })
    .state("show", {
      url: "/events",
      templateUrl: "/js/ng-views/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
}

function IndexControllerFunction($scope) {
  // this.newUserInput = new EventFactory();
  // this.create = function() {
  //     this.newUserInput.save().then(function(event){
  //       $state.go("index")
  //     })
  //   }

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
  console.log(user)
  }
}

function ShowControllerFunction(){
  
  }
