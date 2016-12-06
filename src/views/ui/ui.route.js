/**
 * This is the main route :)
 */

function ui ($stateProvider) {

  $stateProvider.state('ui', {
    url: '/ui',
    templateUrl: 'ui/ui.html',
    controller: 'UiController',
    controllerAs: 'vm'
  })
  .state('ui.icons', {
      url: '/icons',
      templateUrl: 'ui/ui.icons.html'
  });
}
