/**
 * Unit controller
 */

function UnitsController ($scope, $state, $stateParams, config, $log) {
  var vm   = this;
  vm.units = [];

  // Get units
  $scope.unitService.find({}).then(function(units) {
    vm.units = units.data;
    $log.debug('find({}) units: ', units);
    $scope.safeApply();
  });

  var vm = this;

  //Return all units matching the given paramaters, if no paramaters given, return all units
  vm.getUnits = function(params) {
    $scope.unitService.find(params || {}).then(function(units) {
      vm.units      = units.data;
      vm.total      = units.total;
      vm.limit      = units.limit;
      $log.debug('unitService.find()', units);
      $scope.safeApply();
    });
  };

  //Create a new empty unit in the database with the default values set in the mongoose model
  vm.addUnit = function() {
      $scope.unitService.create({title: Date.now()}).then(function (unit, error) {
        vm.units.unshift(unit);
        $scope.safeApply();
        $log.debug('addUnit', unit);
      });
  };

  //Remove a unit from the database
  vm.deleteUnit = function(unit) {
    $scope.unitService.remove({_id: unit._id}).then(function () {
      vm.units.splice(vm.units.indexOf(unit), 1);
      $scope.safeApply();
      $log.debug('deleteUnit', unit);
    });
  };

  vm.logUnits = function() {
    $log.debug(vm.units);
  };

  //Initial call to getUnits to populate the view model.
  vm.getUnits();
}
