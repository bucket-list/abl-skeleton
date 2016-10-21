# ABL-skeleton
This is the ABL core application skeleton/scaffold for developing client side Angular.js web applications.

## Dependencies
| Library           |        |
| :---------------- | -----: |
| angular           | 1.5.8  |
| angular-animate   | 1.5.8  |
| angular-aria      | 1.5.8  |
| angular-messages  | 1.5.8  |
| angular-mocks     | 1.5.8  |
| angular-material  | 1.1.1  |
| angular-ui-router | 0.3.1  |
| jquery            | 3.1.1  |
| socket.io         | 1.5.0  |
| angular-socket-io | 0.7.0  |
| feathers-client   | 1.6.1  |
| ng-feathers       | 1.6.1  |
| ng-device-detector| 3.0.1  |
| moment            | 2.15.1 |

## Features
- Uses [John Papa](https://github.com/johnpapa/angular-styleguide) conventions
- Live reload development web server (browserSync)
- Babel (es2015) javascript compilation
- SCSS (node-sass)
- ESLint
- Preprocessing HTML and Javascript (by using ```.env``` file)
- node_modules & npm for front-end dependency management
- Device, OS, and browser detection with ng-device-detector.
- Remote client logging with Feathers.js log service.

## Install
```
npm install -g gulp requirejs karma karma-chrome-launcher jasmine-core
```
```
npm install
```

## Development
```
npm run dev
```
1. Starts browserSync on port 3000.
2. Starts Feathers.js API server on port 3030.
3. Watches file changes and rebuilds app, then reloads browserSync and Feathers.js API server.

## Distribution
```
npm run dist
```

## Testing
```
npm run test
```
Unit testing with [Karma](http://karma-runner.github.io/1.0/index.html), [Jasmine](http://jasmine.github.io/), and generated code coverage reports with [Istanbul](https://github.com/gotwarlost/istanbul).

[Reference Guide -- airpair.com/angularjs/posts/unit-testing-angularjs-applications](https://www.airpair.com/angularjs/posts/unit-testing-angularjs-applications)

## Configuration with .env file
Define environment variables used to configure the build of the client-side Angular application.

```
MODULE_NAME=abl
FEATHERS_URL=http://localhost:3030
DEBUG=true
MD_INK=false
```
| Variable | Type | Default | Description |
| :--------| :----| :-------| :-----------|
| MODULE_NAME | String | abl | Main application module name. |
| FEATHERS_URL | String | http://localhost:3030 | Feathers.js API server URL. |
| DEBUG | Boolean | true | Enable/disable application-wide debugging message output. |
| MD_INK | Boolean | false | Enable/disable application-wide md-ink effect. |


The contents of this file can be accessed in HTML / Javascript. For example:

*_src/index.html_*
```html
<html ng-app="<!-- @echo MODULE_NAME -->">
```

*_src/components/config/config.constant.js_*
```javascript
var config = {
  MODULE_NAME: '/* @echo MODULE_NAME */',
  FEATHERS:    '/* @echo FEATHERS_URL */',
  DEBUG:       '/* @echo DEBUG */',
  MD_INK:      '/* @echo MD_INK */'
};
```

*_src/components/main/main.config.js_*
```javascript
function main ($locationProvider, $compileProvider, $logProvider, $mdInkRippleProvider, config) {
  $compileProvider.debugInfoEnabled(config.DEBUG);
  $logProvider.debugEnabled(config.DEBUG);

  if(config.MD_INK === 'false') {
    $mdInkRippleProvider.disableInkRipple();
  }

  $locationProvider
    .html5Mode(true)
    .hashPrefix('!');
}
```

*_src/components/main/feathers.config.js_*
```javascript
function feathers ($feathersProvider, config) {
    $feathersProvider.setEndpoint(config.FEATHERS);
    // You can optionally provide additional opts for socket.io-client
    $feathersProvider.useSocket(true);
}
```

## Logging / Debugging
**ALWAYS** use Angular's built-in $logProvider and $log.debug() for logging to console for debugging purposes. This way we can enable/disable logging application-wide for development and production simply by changing the DEBUG boolean variable in the .env file.

```javascript
function MainController ($scope, $log, config) {
  // Only printed to console if debug mode is enabled.
  $log.debug('Debug mode enabled.');
}
```

ESLint will throw a warning for 'no-console' if you forget this principal and use console.log().

## 'Safe' $apply in Angular.js
To avoid triggering the *$apply already in progress error* (for me I find I hit most often when integrating third party plugins that trigger a lot of DOM events), you can use a 'safeApply' method that checks the current phase before executing your function. This is patched into the $scope object of topmost controller (NavController), and Angular propagates it throughout the rest of the application:

```javascript
$scope.safeApply = function(fn) {
  var phase = this.$root.$$phase;
  if(phase == '$apply' || phase == '$digest') {
    if(fn && (typeof(fn) === 'function')) {
      fn();
    }
  } else {
    this.$apply(fn);
  }
};
```

Usage within child controllers throughout the Angular application:
```javascript
$scope.safeApply();
```

## Feathers.js API Server
- The test/server.js file starts a local instance of the same Express/Feathers.js server environment hosted on the backend.
- Sample data is persisted with NeDB which uses flat-file databases locally -- so no need to configure MongoDB on your development system.
- API end-points can remain unchanged from dev to production, so all we need to change is the FEATHERS_URL in the .env file to direct the client application to use a public-facing internet accessible Feathers.js API server (e.g. https://api.adventurebucketlist.com).

## Components?
Components are small, reusable parts of the application.

All component files *DO NOT* need angular module definitions, it happens for you.

So you don't ever have to write this:

```javascript
angular.module('myApp').directive('myAwesomeDirective', myAwesomeDirective);
angular.module('myApp').controller('MyAwesomeController', MyAwesomeController);
```
Instead, the type is defined in the filename i.e. `dashboard.directive.js`, `dashboard.controller.js`

### Why?
Too much wasted time creating files alone, and always the same code repeating. We declare the type in the filename instead.

### Directives
*dashboard.directive.js*

```javascript
function dashboard () {
  return {
    restrict: 'E',
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {}
  }
}
```

### Controllers
*dashboard.controller.js*

```javascript
function DashboardController () {
  var vm = this;
}
```

### Factories / Services
*users.factory.js*

```javascript
function users ($q, $http) {
  var getUser = function (userId) {
    return $http.get('/users/' + userId);
  }

  return {
    getUser: getUser
  }
}
```
### More (filters, config, run, constant)

## TODO: AppShell architecture
Moving towards an offline-available, cached version of the application for improved customer experience and load times.

### Inspiration
[App shell architecture -- Google's engineering blog post](https://developers.google.com/web/updates/2015/11/app-shell)
[Slack's incremental boot architecture blog post](https://slack.engineering/getting-to-slack-faster-with-incremental-boot-ff063c9222e4#.vsq8c6hh5)
