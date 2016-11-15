function ui () {
  return {
    restrict: 'E',
    templateUrl: 'ui/ui-demo.html',
    controller: 'UiController',
    bindToController: true,
    controllerAs: 'vm',
    scope: {}
  };
}
