function theme ($mdThemingProvider) {
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
   .backgroundPalette('grey').dark();

  // Enable browser color for mobile devices.
  $mdThemingProvider.enableBrowserColor({
    theme:   'default',
    palette: 'accent',
    hue:     '800'
  });
}
