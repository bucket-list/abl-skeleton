function NavController ($scope, $rootScope, $state, $feathers, $window, $mdBottomSheet, $mdToast, $mdMedia, $log, logSocket, deviceDetector, config) {
  var vm = this;
  $log.debug('Debugging enabled.');
  $log.debug('$feathers ', $feathers);
  $log.debug('logSocket ', logSocket);

  // Watch app-wide state-changes
  $rootScope.$on('$locationChangeStart',function(event, toState, toParams, fromState, fromParams){
    //debug(event);
    $log.debug('$locationChangeStart ', toState, $state);
  });

  $scope.screenIsBig = function() {
    return $mdMedia('gt-xs');
  };

  $scope.screenIsNormal = function() {
    return !$mdMedia('xs');
  };

  $scope.moduleName  = config.MODULE_NAME;
  $scope.navOpen     = true;
  $scope.loading     = true;

  $rootScope.$on('$stateChangeSuccess',
  function(event, toState, toParams, fromState, fromParams){});

  $scope.user = {};
  $scope.user.niceName = 'Kevin Adams';

  $scope.navType = 0;

  $scope.navView = function() {
    if($scope.navType === 0) {
      return 'nav/leftNav.html';
    }
    if($scope.navType === 1) {
      return 'nav/leftNavThin.html';
    }
  };

  $scope.secondaryNavView = function() {
    if(!$state.current.templateUrl) {
      return '';
    }
    if($state.current.templateUrl.substr(0,18) === 'properties/details') {
      return 'properties/details/properties.nav.html';
    }
    if($state.current.templateUrl.substr(0,13) === 'units/details') {
      return 'units/details/units.nav.html';
    }
  };

  vm.device = deviceDetector;
  vm.themes = ['default','newTheme', 'black','purple'];
  vm.themeIndex = 0;

  // Application-wide UI theme.
  $scope.theme = 'default';

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

  // Application-wide options for svg-morpheus icon transitions.
  // https://github.com/alexk111/SVG-Morpheus
  $scope.iconTransitionOptions = {
    'duration': 375
  };
  $scope.navCollapseIcon = 'chevron_left';
  // Toggle navigation collapse/expand icon.
  $scope.toggleNav = function() {
    if($scope.navOpen) {
      $scope.navCollapseIcon = 'menu';
    }
    if(!$scope.navOpen) {
      $scope.navCollapseIcon = 'chevron_left';
    }
    $scope.navOpen = !$scope.navOpen;
    $scope.safeApply();
  };


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

  // State change logic for ui-router to manage navigation changes.
  $scope.changeState = function (state) {
    $log.debug('STATE', state);
    $state.go(state);
  };

  $scope.gotoPage = function(page) {
    $log.debug(page);
    $state.go(page);
  };

  // Feathers unit service.
  $scope.unitService = $feathers.service('units');
  // Feathers property service.
  $scope.propertyService = $feathers.service('properties');
  // Feathers upload service.
  $scope.uploadService = $feathers.service('uploads');

  $scope.uploadService.on('created', function(file){
                $log.debug('Server received file created event!', file);
  });
  //Array to store logged messages.
  $scope.logs = [];
  //Log user connection and os/browser information to Feathers log service.
  logSocket.emit('log::create', {
      text:            'CLIENT_CONNECTED',
      os:              vm.device.os,
      os_version:      vm.device.os_version,
      browser:         vm.device.browser,
      browser_version: vm.device.browser_version,
      device:          vm.device.device,
      createdAt:       Date.now()
    }, (error, log) => {
      if(error) {
        $log.debug(error);
      }
      else {
        $log.debug('log.create ', log);
      }
  });

  //Handle new log from Feathers remote log service
  logSocket.on('log created', function (log) {
        $log.debug('log.created ', log);
        $scope.logs.push(log);
  });
  //Function to output $feathers object to console for debugging.
  $scope.logFeathers = function() {
    $log.debug($feathers);
  };

}
