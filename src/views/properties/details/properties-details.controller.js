function PropertiesDetailsController ($scope, $state, $stateParams, config, $log) {
  var vm = this;
  vm.property   = {};
  vm.languagesSelected = [];
  vm.languages = ['French', 'English', 'Spanish'];

  vm.viewProperty = function(property) {
        //$log.debug('viewProperty', property);
        $scope.propertyService.get({_id: property}).then(function(prop) {
          $log.debug('propertyService.get({_id: ' + property + '})', prop);
          vm.property = prop;
          vm.languagesSelected = vm.property.languages;
        });
  };

  vm.updateProperty = function() {
        //$log.debug('viewProperty', property);
        $scope.propertyService.update(vm.property._id, vm.property).then(function(prop) {
          $log.debug('propertyService.update({_id: ' + prop._id + '})', prop);
        });
  };

  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  vm.viewProperty($stateParams.propertyId);
}
