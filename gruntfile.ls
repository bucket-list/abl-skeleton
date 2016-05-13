module.exports = (grunt)->
  convert-mapping = (file)->
      ".compiled/#{file.dest}": file.src.0
  make-pair = (from, to)->
    grunt.file.expand-mapping(["app/components/**/*#from", "./*#from", "app/*#from"], "", {ext: to, extDot: 'last'  }).map(convert-mapping)

  mapping =
    * to: \.js
      from: [\.ls, \.coffee, \.ts, \.js]
    * to: \.css
      from: [\.css, \sass]
    * to: \.html
      from: [\.html, \.jade]

  key = (o)->
      Object.keys(o).0

  get-compiled = (to)->
    (mapping.filter(-> it.to is to)).0.from.map( (from)->  make-pair(from, to).map(key) ).reduce( (a,b)-> a.concat(b)).map(-> __dirname + \/ +  it )




  require(\time-grunt) grunt
  load-module-first = (x)->
      | Object.keys(x).0.index-of('module') > -1 => -1
      | _ => 0
  separate = (arr, return-mods)->
       arr.filter(-> (Object.keys(it).0.index-of(\module) >  -1) is return-mods)
  live =
      make-pair(\.ls,\.js)
  live-modules =
      separate live, yes
  live-other =
      separate live, no
  coffee =
      make-pair(\.coffee,\.js)
  ts =
      make-pair(\.ts,\.js)
  coffee-modules =
      separate coffee, yes
  coffee-other =
      separate coffee, no

  ts-modules =
      separate ts, yes
  ts-other =
      separate ts, no


  files =
    live: live-modules ++ live-other
    coffee: coffee-modules ++ coffee-other
    ts: ts-modules ++  ts-other
    jade: make-pair \.jade, \.html
    sass: make-pair \.sass, \.css


  path = do
    js = -> "client/js/#it"
    app: js \app.js
    app-style: \.compiled/app/index.css
    app-module: \.compiled/app/index.js
    templates: js \app_templates.js
  grunt.init-config do
    sass:
      no_options:
        includePaths: 
          * __dirname + "/app/components"
          ...
        files:
          files.sass
    jade:
      html:
        files: files.jade
        options:
          basedir: __dirname + "/app/components"
          client: no
          wrap: no
          node: no
          runtime: no
    ngAnnotate:
      options:
         single-quotes: yes
      app1:
         files: get-compiled('.js').filter(-> it.index-of(\client.js) > -1).map(-> "#it": [it])
    ngtemplates:
      app:
        src: ".compiled/app/components/**/*.html"
        dest: path.templates
        options:
          url: (url) ->
            url.replace \.html, ''
               .replace /.+\//i, ''
          bootstrap: (module, script)->
            "angular.module('app').run(['$templateCache',function($templateCache) { #{script} }])"
    ts:
       options:
        bare: yes
       src: files.ts
    livescript:
       options:
        bare: yes
       src:
        files: files.live
    coffee:
       options:
        bare: yes
       src:
        files: files.coffee
    bower:
      install: {}
    bower_concat:
      all:
        dest: \lib/_bower.js
        cssDest: \lib/_bower.css
        dependencies: {}
        bowerOptions:
          relative: false
    concat:
      basic:
        src:
            staf =
                * \lib/_bower.js
                * path.app-module
                * \.compiled/config.js
                #* \.compiled/xonom.service.js
                * path.templates
            js =
                get-compiled(".js").filter(-> it.index-of(\client.js) > -1)
            staf ++ js
        dest: path.app
        options:
          banner: "(function( window ){ \n 'use strict';"
          footer: "}( window ));"
      extra:
        src: do
          const bower =
            * \lib/_bower.css
            ...
          const app =
            get-compiled(".css")
          bower ++ app
        dest: \client/css/app.css
    min :
      dist :
        src : [\client/js/app.js]
        dest: \client/js/app.js
    remove_usestrict:
      dist:
        files:
          * expand: true,
            cwd: \client/js/
            dest: \client/js/
            src:
              * \app.js
              ...
          ...
    ngconstant: do
      #const client-token-path = \payments/setup
      options:
        space: '  '
        wrap: '(function () { "use strict"; }());\n\n{%= __ngModule %}'
        name: \config
        dest: \.compiled/config.js
      local:
        constants:
          enabled-debug: yes
          ENV:
            name: \local
            img-bucket: \//dev-images.ablsolution.com/
            widget-url: \//localhost/
            api-url: \//localhost:8001/
      c9: do
        constants:
          enabled-debug: yes
          ENV:
            name: \c9
            img-bucket: \//dev-images.ablsolution.com/
            widget-url: \//tour-widget-askucher.c9.io/
            api-url: \//staging-api.adventurebucketlist.com/
            #api-url: \//m.staging-api.adventurebucketlist.com/
            #api-url: \//api.adventurebucketlist.com/
      askucher: do
        constants:
          enabled-debug: yes
          ENV:
            name: \askucher
            img-bucket: \//dev-images.ablsolution.com/
            widget-url: \//209.126.77.111:8002/
            api-url: \//209.126.77.111:8001/
      staging: do
        constants:
          enabled-debug: no
          ENV:
            name: \staging
            img-bucket: \//photos.ablsolution.com/
            widget-url: \//m.staging-widget.adventurebucketlist.com/
            api-url: \//staging-api.adventurebucketlist.com/
      demo: do
        constants:
          enabled-debug: no
          ENV:
            name: \demo
            img-bucket: \//demo.ablsolution.com/
            widget-url: \//m.demo-widget.adventurebucketlist.com/
            api-url: \//demo-api.adventurebucketlist.com/
      prod: do
        constants:
          enabled-debug: no
          ENV:
            name: \prod
            img-bucket: \//images.ablsolution.com/
            widget-url: \//m.widget.adventurebucketlist.com/
            api-url: \//api.adventurebucketlist.com/
    replace: do
      const replace = (options)->
        options:
          patterns: options
        files:
          * expand: yes
            flatten: yes
            src:
              * \client/js/jquery-button.js
              * \client/js/jquery-plugin.js
            dest: \client/js/
          ...
      c9:      replace do
                 * * match: \server-url/
                     replacement: \http://tour-widget-askucher.c9.io/
                   ...
      askucher: replace do
                 * * match: \server-url/
                     replacement: \http://209.126.77.111:8002/
                   ...
      staging: replace do
                 * * match: \server-url/
                     replacement: \//m.staging-widget.adventurebucketlist.com/
                   ...
      demo:    replace do
                 * * match: \server-url/
                     replacement: \//m.demo-widget.adventurebucketlist.com/
                   ...
      prod:    replace do
                 * * match: \server-url/
                     replacement: \//m.widget.adventurebucketlist.com/
                   ...
    copy:
      main:
        files:
          * expand: no
            src: [\.compiled/app/index.html]
            dest: \client/index.html
          * expand: yes
            cwd: ''
            src: \app/components/**/*.js
            dest: \.compiled
            flatten: no
            filter: \isFile
          * expand: yes
            cwd: ''
            src: \app/components/**/*.css
            dest: \.compiled
            flatten: no
            filter: \isFile
          * expand: yes
            cwd: ''
            src: \app/components/**/*.html
            dest: \.compiled
            flatten: no
            filter: \isFile
    removelogging:
      dist:
        src: "js/application.js"
        dest: "js/application-clean.js"
    uglify:
      options:
        beautify: 
          ascii_only: true
        compress: yes
        mangle: no
        source-map: no
        ASCIIOnly: true 
      target:
        src: \client/js/app.js
        dest: \client/js/app.js
    watch:
      scripts:
        files:
          * \app/**/*.*
          ...
        tasks:
           * \newer:sass
           * \newer:jade
           * \newer:livescript
           * \newer:coffee
           * \xonom
           * \copy
           * \ngtemplates
           * \concat:basic
           * \concat:extra
           * \remove_usestrict
           * \shell:start
           * \clean
           ...
        options:
          spawn: no
          livereload: no
    clean:
      build:
        src: [\client/js/app_templates.js]
    open:
      dev:
        path: 'http://127.0.0.1:80'
        app: 'google-chrome'
    xonom:
      options:
        input:
          controllers: get-compiled(".js").filter (.index-of(\api.server.js) > -1)
        output:
           angular-service: \.compiled/xonom.service.js
           express-route: \.compiled/xonom.route.js
    shell:
        start:
          command: 'killall -9 node; cd .compiled; forever stop server.js; forever start server.js'
        node:
          command: 'killall -9 node; node .compiled/server.js'
    newer:
      options:
        cache: \.cache
  const build =
    * \default
    * \askucher
    * \prod
    * \staging
    * \demo
    * \dist
    * \debug
  const npm-tasks =
    * load: \bower-task
      register: \bower
      configs: build
    * load: \bower-concat
      register: \bower_concat
      configs: build
    * load: \ts
      register: \ts
      configs: []
    * load: \livescript
      register: \livescript
      configs: build
    * load: \contrib-coffee
      register: \coffee
      configs: [\default]
    * load: \contrib-jade
      register: \jade
      configs: build
    * load: \ng-constant
      register: \ngconstant:c9
      configs:
        * \default
    * load: \ng-constant
      register: \ngconstant:askucher
      configs:
        * \askucher
    * load: \ng-constant
      register: \ngconstant:staging
      configs:
        * \staging
        ...
    * load: \ng-constant
      register: \ngconstant:demo
      configs:
        * \demo
        ...
    * load: \ng-constant
      register: \ngconstant:prod
      configs:
        * \prod
        ...
    * load: \sass
      register: \sass:no_options
      configs: build
    * load: \contrib-copy
      register: \copy
      configs: build
    * load: \angular-templates
      register: \ngtemplates
      configs: build
    * load: \xonom
      register: \xonom
      configs: build
    * load: \ng-annotate
      register: \ngAnnotate
      configs: build
    * load: \contrib-concat
      register: \concat
      configs: build
    * load: \remove-usestrict
      register: \remove_usestrict
      configs: build
    * load: \contrib-uglify
      register: \uglify
      configs:
        * \askucher
        * \prod
        * \demo
        * \staging
    * load: \yui-compressor
      register: \min
      configs: []
    * load: \shell
      register: \shell:start
      configs: [\default, \askucher]
    * load: \shell
      register: \shell:node
      configs: [\debug]
    * load: \contrib-clean
      register: \clean
      configs: build
    * load: \open
      register: \open
      configs:
        []
        ...
    * load: \contrib-watch
      register: \watch
      configs:
         * \default
         ...
  for task in npm-tasks
    grunt.load-npm-tasks "grunt-#{task.load}"
  const load = (name)->
    grunt.register-task do
      * name
      * npm-tasks.filter(-> it.configs.index-of(name) > -1).map(-> it.register)

  grunt.load-npm-tasks('grunt-newer')

  load \default
  load \askucher
  load \staging
  load \demo
  load \prod
