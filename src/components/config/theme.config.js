function theme ($mdThemingProvider) {
  $mdThemingProvider.alwaysWatchTheme(true);

  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .accentPalette('lime')
    .warnPalette('red')
    .backgroundPalette('grey');

  $mdThemingProvider
   .theme('newTheme')
   .primaryPalette('red')
   .accentPalette('teal')
   .warnPalette('yellow')
   .backgroundPalette('grey');

  // Enable browser color for mobile devices.
  $mdThemingProvider.enableBrowserColor({
    theme:   'default',
    palette: 'accent',
    hue:     '800'
  });
}
