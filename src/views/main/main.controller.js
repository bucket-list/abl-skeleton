/**
 * Main controller
 */

function MainController ($scope, users, config, $feathers) {
  var vm = this;
  $scope.moduleName = config.MODULE_NAME;

  $scope.logs = [];
  $scope.logService = $feathers.service('log');

  vm.logFeathers = function() {
    console.log($feathers);
  };

  //Log user connection to feathers log service
  $scope.logService.create({text: 'CONNECT', createdAt: Date.now()});

  //Handle new log from feathers log service
  $scope.logService.on('created', function (log) {
        console.log(log);
        $scope.logs.push(log);
  });


}
