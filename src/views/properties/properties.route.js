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
  .state('details', {
      url: '/properties/:propertyId',
      templateUrl: 'properties/details/properties.details.html',
      controller: 'PropertiesDetailsController',
      controllerAs: 'vm'
  })
  .state('details.details', {
      url: '/details',
      templateUrl: 'properties/details/properties.info.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('details.amenities', {
      url: '/amenities',
      templateUrl: 'properties/details/properties.amenities.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('details.contact', {
      url: '/contact',
      templateUrl: 'properties/details/properties.contact.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('properties.rules', {
      url: '/rules',
      templateUrl: 'properties/properties.rules.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('details.photos', {
      url: '/photos',
      templateUrl: 'properties/details/properties.photos.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  })
  .state('details.map', {
      url: '/map',
      templateUrl: 'properties/details/properties.map.html',
      controller: function($scope, $stateParams, $log){
        $log.debug($stateParams);
      }
  });
}
