function units ($stateProvider) {

  $stateProvider.state('units', {
    url: '/units',
    templateUrl: 'units/units.html',
    controller: 'UnitsController',
    controllerAs: 'vm'
  })
  .state('unit', {
      url: '/units/:unitId',
      templateUrl: 'units/details/units.details.html',
      controller: 'UnitDetailsController',
      controllerAs: 'vm'
  })
  .state('unit.details', {
      url: '/details',
      templateUrl: 'units/details/unit.info.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('unit.amenities', {
      url: '/amenities',
      templateUrl: 'units/details/unit.amenities.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('unit.rooms', {
      url: '/rooms',
      templateUrl: 'units/details/unit.rooms.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('unit.descriptions', {
      url: '/descriptions',
      templateUrl: 'units/details/unit.descriptions.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('unit.photos', {
      url: '/photos',
      templateUrl: 'units/details/unit.photos.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  });

}
