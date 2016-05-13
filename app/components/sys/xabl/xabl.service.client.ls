angular.module(\app).service do
  * \$xabl
  * ($http, ENV, notification, debug, $root-scope, $state)->
      api-url = ENV.api-version
      #api-url = ""
      req = (method)->
         (request, data, config) ->
            console.log request, data
            query = if typeof! data?params is \Object and method is \GET
                    then "?" + $.param(data.params)
                    else ""
            #debug "#{api-url}/#{request}#{query}", data, $.param(data.params)
            r =   
                method: 
                   | method is \UPDATE => \PUT
                   | method is \CREATE => \POST
                   | _ => method
                url: "#{api-url}/#{request}#{query}"
                data: data
                headers: data?_custom-headers ? {}
            if data?_custom-headers?
              delete data._custom-headers
            $http(r)
              .success (data)->
                  if method is \UPDATE
                    notification.info config?success-message ? "Item has been updated successfully"
                  if method is \CREATE
                    notification.info config?success-message ? "Item has been created successfully"
                  if method is \DELETE
                    notification.info config?success-message ? "Item has been deleted successfully"
              .error (result, status, headers, config)->
                  if JSON.stringify(result).index-of("csrf") > -1
                  then 
                    alert "Your session has expired"
                    return $state.go \login
                    
                  debug ->
                      return if window.reporting is \off
                      title = encodeURIComponent "API ERROR: #{r.method} #{request}"
                      body = do
                        arr = 
                             * 'Please do not close this issue without confirmation that issue is closed.'
                             * "Request body:"
                             * "```json"
                             * JSON.stringify data, null, 4
                             * "```"
                             * "Request headers:"
                             * "```"
                             *  JSON.stringify config.headers, null, 4
                             * "```"
                             * ""
                             * "Response: "
                             * "```text"
                             * result?errors?0
                             * "```"
                             * "Response status: #status"
                             * "Response headers:"
                             * "```"
                             *  JSON.stringify headers!, null, 4
                             * "```"
                             #* ""
                             #* "Current user:"
                             #* "```json"
                             #* JSON.stringify $root-scope.user, null, 4
                             #* "```"
                        arr.join(\\n) |> encodeURIComponent 
                      win = window.open "https://github.com/bucket-list/common/issues/new?title=#title&body=#body", \_blank
                      win.focus!
                  message = 
                     | status is 401 and request is \login => "Incorrect Username or Password"
                     | status is 401 => "Your session has expired.  Please log in again."
                     | _ => result?errors?0 ? "Server error"
                  notification.error message
      create: req \CREATE
      update: req \UPDATE
      post: req \POST
      get: req \GET
      put: req \PUT
      patch: req \PATCH
      delete: req \DELETE