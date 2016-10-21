/**
 * Main controller
 */

function UnitsController ($scope, users, config, $feathers, $log) {
  var vm = this;
  vm.units = [];

  $scope.unitService = $feathers.service('units');

  // Get units
  $scope.unitService.find({}).then(function(units) {
    vm.units = units.data;
    $log.debug('Units', units);
    $scope.safeApply();
  });

  vm.logUnits = function() {
    $log.debug(vm.units);
  };
}
