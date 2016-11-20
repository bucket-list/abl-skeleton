function property ($log) {
  return {
    restrict: 'E',
    templateUrl: 'property/property.html',
    controller: 'PropertyController',
    bindToController: true,
    controllerAs: 'vm',
    link: function($scope, $element, $attrs){
      $log.debug('property');
      $log.debug($attrs);

      return $scope.mode = $attrs.mode;
    },
    scope: {}
  };
}
