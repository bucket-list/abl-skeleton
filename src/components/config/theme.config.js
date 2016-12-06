function theme ($mdThemingProvider) {
  $mdThemingProvider.alwaysWatchTheme(true);

  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue', {
      'default': 'A400', // by default use shade 400 for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '800', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .accentPalette('blue', {
      'default': 'A400', // by default use shade 400 for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '800', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .warnPalette('red')
    .backgroundPalette('grey');

  $mdThemingProvider
   .theme('newTheme')
   .primaryPalette('red')
   .accentPalette('blue')
   .warnPalette('yellow')
   .backgroundPalette('grey');

  $mdThemingProvider
    .theme('black')
    .primaryPalette('grey', {
      'default': 'A400', // by default use shade 400 for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '800', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .accentPalette('purple', {
      'default': '200'
    })
    .warnPalette('red')
    .backgroundPalette('grey');

  $mdThemingProvider
    .theme('purple')
    .primaryPalette('indigo', {
      'default': 'A400', // by default use shade 400 for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '800', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .accentPalette('yellow', {
      'default': '200'
    })
    .warnPalette('yellow')
    .backgroundPalette('grey');

  // Enable browser color for mobile devices.
  $mdThemingProvider.enableBrowserColor({
    theme:   'default',
    palette: 'primary',
    hue:     '800'
  });
}
