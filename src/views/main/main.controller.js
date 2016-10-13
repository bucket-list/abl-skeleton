/**
 * Main controller
 */

function MainController ($scope, users, config, $feathers) {
  $scope.moduleName = config.MODULE_NAME;

  $scope.messages = [];
  $scope.messageService = $feathers.service('messages');

  //console.log($feathers);

  //Log user connection to feathers message service
  $scope.messageService.create({text: 'User connected.'});

  //Handle new message from feathers message service
  $scope.messageService.on('created', function (msg) {
        console.log(msg);
        $scope.messages.push(msg);
  });


}
