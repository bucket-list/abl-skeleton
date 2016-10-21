/**
 * This it the main, module config file
 */

function main ($locationProvider, $mdThemingProvider, $compileProvider, $logProvider, $mdInkRippleProvider, config) {
  $compileProvider.debugInfoEnabled(config.DEBUG);
  $logProvider.debugEnabled(config.DEBUG);

  if(config.MD_INK === 'false') {
    $mdInkRippleProvider.disableInkRipple();
  }

  $mdThemingProvider.alwaysWatchTheme(true);

  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('purple')
    .warnPalette('red')
    .backgroundPalette('grey');

  $mdThemingProvider
   .theme('newTheme')
   .primaryPalette('red')
   .accentPalette('teal')
   .warnPalette('pink')
   .backgroundPalette('grey');

  // Enable browser color for mobile devices.
  $mdThemingProvider.enableBrowserColor({
    theme:   'default',
    palette: 'accent',
    hue:     '800'
  });

  $locationProvider
    .html5Mode(true)
    .hashPrefix('!');
}
