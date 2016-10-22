function NavController ($scope, $state, $feathers, $log, deviceDetector, config) {
  var vm = this;
  $log.debug('Debugging enabled.');

  $scope.moduleName = config.MODULE_NAME;
  $scope.navOpen = true;

  vm.device = deviceDetector;
  vm.themes = ['default','newTheme'];
  vm.themeIndex = 0;

  // Application-wide UI theme.
  $scope.theme = 'newTheme';
  // Change to next available UI theme.
  $scope.changeTheme = function() {
    if(vm.themeIndex === vm.themes.length - 1) {
      vm.themeIndex = 0;
    }
    else {
      vm.themeIndex++;
    }
    $scope.theme = vm.themes[vm.themeIndex];
    $scope.safeApply();
  };

  // Application-wide safeApply function for usage in child controllers as
  // better alternative to $apply();
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase === '$apply' || phase === '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  // State change logic for ui-router to manage navigation changes.
  $scope.changeState = function (state) {
    $log.debug('STATE', state);
    $state.go(state);
  };

  // Feathers log service.
  $scope.logService = $feathers.service('log');
  // Feathers unit service.
  $scope.unitService = $feathers.service('units');
  //Array to store logged messages.
  $scope.logs = [];
  //Log user connection and os/browser information to Feathers log service.
  $scope.logService.create({
    text:            'CLIENT_CONNECTED',
    os:              vm.device.os,
    os_version:      vm.device.os_version,
    browser:         vm.device.browser,
    browser_version: vm.device.browser_version,
    device:          vm.device.device,
    createdAt:       Date.now()
  });
  //Handle new log from Feathers log service
  $scope.logService.on('created', function (log) {
        $log.debug('Feathers log:   ', log);
        $scope.logs.push(log);
  });
  //Function to output $feathers object to console for debugging.
  $scope.logFeathers = function() {
    $log.debug($feathers);
  };
}
