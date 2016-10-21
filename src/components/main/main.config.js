/**
 * This it the main, module config file
 */

function main ($locationProvider, $compileProvider, $logProvider, $mdInkRippleProvider, config) {
  $compileProvider.debugInfoEnabled(config.DEBUG);
  $logProvider.debugEnabled(config.DEBUG);

  if(config.MD_INK === 'false') {
    $mdInkRippleProvider.disableInkRipple();
  }

  $locationProvider
    .html5Mode(true)
    .hashPrefix('!');
}
