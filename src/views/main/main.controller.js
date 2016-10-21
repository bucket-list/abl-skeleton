/**
 * Main controller
 */

function MainController ($scope, $log, users, config, $feathers) {
  var vm = this;
  $scope.moduleName = config.MODULE_NAME;

  $scope.logs = [];
  $scope.logService = $feathers.service('log');

  $log.debug('Debug mode enabled.');
  vm.logFeathers = function() {
    $log.debug($feathers);
  };

  //Log user connection to feathers log service
  $scope.logService.create({text: 'CONNECT', createdAt: Date.now()});

  //Handle new log from feathers log service
  $scope.logService.on('created', function (log) {
        $log.debug(log);
        $scope.logs.push(log);
  });


}
