#document.write('<script src="//' + (location.hostname || \localhost) + ':35729/livereload.js?snipver=1"></script>')

angular
  .module do
    * \app
    * * \ui.router
      * \ablsdk
      * \config
      * \ngMaterial      
      ...
  .config ($httpProvider)->
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'
  .directive do
    * \stopPropagation
    * ->
        restrict: \C
        link: (scope, element) ->
          $current = $(element)
          $current.click (event) ->
            event.stop-propagation!
    
