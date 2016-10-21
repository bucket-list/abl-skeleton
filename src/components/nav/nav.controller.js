function NavController ($scope, $state, $feathers, $log, config) {
  var vm = this;

  $scope.moduleName = config.MODULE_NAME;
  $scope.navOpen = true;

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
  $scope.logFeathers = function() {
    $log.debug($feathers);
  };
  //Array to store logged messages.
  $scope.logs = [];
  //Log user connection to Feathers log service
  $scope.logService.create({text: 'CONNECT', createdAt: Date.now()});
  //Handle new log from Feathers log service
  $scope.logService.on('created', function (log) {
        $log.debug('Feathers log:   ', log);
        $scope.logs.push(log);
  });
}
