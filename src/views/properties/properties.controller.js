function PropertiesController ($scope, $state, $stateParams, config, $log) {
  var vm = this;
  vm.properties = [];
  vm.property   = {};
  vm.limit      = 50;
  vm.total      = 0;
  vm.position   = 0;

  vm.viewLayout = 'view_module';

  vm.toggleView = function() {
    if(vm.viewLayout === 'view_list'){
      vm.viewLayout = 'view_module';
    } else {
      vm.viewLayout = 'view_list';
    }
  };

  vm.getProperties = function(params) {
    $scope.propertyService.find(params || {}).then(function(properties) {
      vm.properties = properties.data;
      vm.total      = properties.total;
      vm.limit      = properties.limit;
      $log.debug('propertyService.find()', properties);
      $scope.safeApply();
    });
  };

  vm.addProperty = function() {
      $scope.propertyService.create({title: Date.now()}).then(function (property, error) {
        vm.properties.unshift(property);
        $scope.safeApply();
        $log.debug('addProperty', property);
      });
  };

  vm.deleteProperty = function(property) {
    $scope.propertyService.remove({_id: property._id}).then(function () {
      vm.properties.splice(vm.properties.indexOf(property), 1);
      $scope.safeApply();
      $log.debug('deleteProperty', property);
    });
  };

  vm.logProperties = function() {
    $log.debug(vm.properties);
  };

  //Initial call to getProperties to populate the view model.
  vm.getProperties();
}
