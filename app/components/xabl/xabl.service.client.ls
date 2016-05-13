angular.module('app').service do 
  * \$xabl
  * ($http, ENV)->
      const applied-options = 
        key: \no-key
        secure: no
      const api-url = ENV.api-url
      const req = (method, request, data) -->
          const json = 
              | method is \GET => ""
              | _ => JSON.stringify data
          const timestamp = Date.parse(new Date!.toISOString!)
          const post = 
              | method is \GET => null
              | _ => data
          const to-base64 = (input) ->
              input
          const sha256 = (input)->
              input
          const encode = 
               to-base64 >> sha256
          const headers =
              | applied-options.secure =>
                "X-ABL-Access-Key": applied-options.key
                "X-ABL-Signature": encode "#{timestamp}#{api-url}#{request}#{json}"
                "X-ABL-Date": timestamp
              | _ =>
                "X-ABL-Access-Key": applied-options.key
                "X-ABL-Date": timestamp
          final-headers = 
            angular.extend (data?_custom-headers ? {}), headers
          delete data?_custom-headers
                                
          const url = 
              | applied-options.secure => \endpoint 
              | _ => "#{api-url}api/v1/#{request}"
          $http do
              * method: method
                url: url
                headers: final-headers
                data: post
      options: applied-options
      setup: (options)->
        applied-options.key = options.key 
        applied-options.secure = options.secure
      post: req \POST
      get: req \GET, _, null