/**
 * This is the main route :)
 */

function properties ($stateProvider) {

  $stateProvider.state('properties', {
    url: '/properties',
    templateUrl: 'properties/properties.html',
    controller: 'PropertiesController',
    controllerAs: 'vm'
  });
}
