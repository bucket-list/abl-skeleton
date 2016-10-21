/**
 * This it the main, module config file
 */

function main ($locationProvider, $compileProvider, $logProvider, config) {

  // @if NODE_ENV='production'
  $compileProvider.debugInfoEnabled(config.DEBUG);
  $logProvider.debugEnabled(config.DEBUG);

  $locationProvider
    .html5Mode(true)
    .hashPrefix('!');
}
