angular
  .module \app
  .directive \notification, ->
     restrict: \E
     scope: {}
     template-url: \notification
     controller: ($scope, notification, debug, $timeout)->
         
       notifications = []
       notification.on \data, (data)->
         $scope.notifications.push data
         $timeout do 
           * ->
               $scope.close data
           * 5 * 1000
       notifications-style = ->
           top: $(window).scroll-top!
       
       close = (notification, $event)->
            if $event?
               $($event.target).closest(\.notification).hide!
            index =  $scope.notifications.index-of(notification)
            $scope.notifications.splice(index, 1)
#-------------------------------------------------------------------------------  
       $scope
         ..notifications = notifications
         ..notifications-style = notifications-style
         ..close = close