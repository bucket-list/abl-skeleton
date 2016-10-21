/**
 * This it the main, module config file
 */

function main ($locationProvider, $compileProvider, $logProvider, config) {

  $compileProvider.debugInfoEnabled(config.DEBUG);
  $logProvider.debugEnabled(config.DEBUG);

  $locationProvider
    .html5Mode(true)
    .hashPrefix('!');
}
