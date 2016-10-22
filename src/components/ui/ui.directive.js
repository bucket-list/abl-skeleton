function ui () {
  return {
    restrict: 'E',
    templateUrl: 'ui/showcase.html',
    controller: 'UiController',
    bindToController: true,
    controllerAs: 'vm',
    scope: {}
  };
}
