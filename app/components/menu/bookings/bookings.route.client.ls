angular
  .module \app
  .config ($state-provider, $url-router-provider) ->
       name = \bookings
       $state-provider.state do
          * name
          * url: "/#name"
            parent: \root
            views:
               'content':
                  template-url: name
                  controller: name
