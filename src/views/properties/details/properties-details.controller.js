function PropertiesDetailsController ($scope, $state, $stateParams, config, $log) {
  var vm = this;
  vm.property   = {};

  vm.viewProperty = function(property) {
        //$log.debug('viewProperty', property);
        $scope.propertyService.get({_id: property}).then(function(prop) {
          $log.debug('propertyService.get({_id: ' + property + '})', prop);
          vm.property = prop;
        });
  };

  vm.viewProperty($stateParams.propertyId);
}
