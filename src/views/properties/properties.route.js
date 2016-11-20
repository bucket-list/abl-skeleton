/**
 * This is the main route :)
 */

function properties ($stateProvider) {

  $stateProvider.state('properties', {
    url: '/properties',
    templateUrl: 'properties/properties.html',
    controller: 'PropertiesController',
    controllerAs: 'vm'
  })
  .state('properties.list', {
      url: '/list',
      templateUrl: 'properties/properties.create.html',
      controller: function($scope, $stateParams, $log){
        $log.debug('STATE properties.list ', $stateParams);
      }
  })
  .state('properties.details', {
      url: '/:id/details',
      templateUrl: 'properties/properties.create.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('properties.amenities', {
      url: '/:id/amenities',
      templateUrl: 'properties/properties.amenities.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('properties.contact', {
      url: '/:id/contact',
      templateUrl: 'properties/properties.contact.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('properties.rules', {
      url: '/:id/rules',
      templateUrl: 'properties/properties.rules.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('properties.photos', {
      url: '/:id/photos',
      templateUrl: 'properties/properties.photos.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('properties.map', {
      url: '/:id/map',
      templateUrl: 'properties/properties.map.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  });
}
