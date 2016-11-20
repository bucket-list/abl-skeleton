/**
 * This is the main, run file
 */

function main ($rootScope, $window, $state, $stateParams) {

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  // always scroll to the top when a new view is loaded.
  $rootScope.$on('$viewContentLoaded', function () {
    $window.scrollTo(0, 0);
  });
}
