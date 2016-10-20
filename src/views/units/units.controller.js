/**
 * Main controller
 */

function UnitsController ($scope, users, config, $feathers) {
  var vm = this;

  $scope.units = [];
  $scope.unitService = $feathers.service('units');

  vm.unitFeathers = function() {
    console.unit($feathers);
  };

  // Get units
  $scope.unitService.find({}).then(function(units) {
    console.log(units);
  });

}
