/**
 * This is the main route :)
 */

function settings ($stateProvider) {

  $stateProvider.state('settings', {
    url: '/settings',
    templateUrl: 'settings/settings.html',
    controller: 'SettingsController',
    controllerAs: 'vm'
  });
}
