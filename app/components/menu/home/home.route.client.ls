angular
  .module \app
  .config ($state-provider, $url-router-provider) ->
       name = \home
       $state-provider.state do
          * name
          * url: "/#name"
            parent: \root
            views:
               'content':
                  template-url: name
                  controller: name
