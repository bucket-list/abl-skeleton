function PropertiesController ($scope, $state, $stateParams, config, $log) {
  var vm = this;
  vm.properties = [];
  vm.property   = {};
  vm.limit      = 50;
  vm.total      = 0;
  vm.position   = 0;

  //Default view is module/card view for the properties view
  vm.viewLayout = 'view_module';

  //Toggle the grid list view between module/card and list views
  vm.toggleView = function() {
    if(vm.viewLayout === 'view_list'){
      vm.viewLayout = 'view_module';
    } else {
      vm.viewLayout = 'view_list';
    }
  };
  //Return all properties matching the given paramaters, if no paramaters given, return all properties
  vm.getProperties = function(params) {
    $scope.propertyService.find(params || {}).then(function(properties) {
      vm.properties = properties.data;
      vm.total      = properties.total;
      vm.limit      = properties.limit;
      $log.debug('propertyService.find()', properties);
      $scope.safeApply();
    });
  };

  //Create a new emptyu property in the database with the default values set in the mongoose model
  vm.addProperty = function() {
      $scope.propertyService.create({title: Date.now()}).then(function (property, error) {
        vm.properties.unshift(property);
        $scope.safeApply();
        $log.debug('addProperty', property);
      });
  };

  //Remove a property from the database
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
