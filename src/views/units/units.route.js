/**
 * This is the main route :)
 */

function units ($stateProvider) {

  $stateProvider.state('units', {
    url: '/units',
    templateUrl: 'units/units.html',
    controller: 'UnitsController'
  });

}
