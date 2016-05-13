angular
  .module(\app)
  .controller \app, ($scope)->
       $scope.open = (item)->
           $state.go item.href
       $scope.opened = (item)->
           $state.current.name is item.href
       $scope.menu = 
         top:
           header: "Section 1"
           list:
              * text: "Home"
                icon: "home"
                href: "home"
              * text: "Users"
                icon: "face"
                href: "users"
         bottom: 
           header: "Section 2"
           list:
              * text: "Bookings"
                icon: "face"
                href: "bookings"
              * text: "Metrics"
                icon: "face"
                href: "metrics"
              