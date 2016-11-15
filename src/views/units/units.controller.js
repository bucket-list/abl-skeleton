/**
 * Main controller
 */

function UnitsController ($scope, users, config, $log) {
  var vm = this;
  vm.units = [];

  // Get units
  $scope.unitService.find({}).then(function(units) {
    vm.units = units.data;
    $log.debug('find({}) units: ', units);
    $scope.safeApply();
  });

  vm.logUnits = function() {
    $log.debug(vm.units);
  };
}
