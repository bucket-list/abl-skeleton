# ABL-skeleton
This is the ABL core application skeleton/scaffold for developing client side Angular.js web applications.

## Libraries
- [jquery 3.1.1]()
- [socket.io 1.5.0]()
- [feathers-client 1.6.1]()
- [angular 1.5.8]()
- [angular-animate 1.5.8]()
- [angular-aria 1.5.8]()
- [angular-messages 1.5.8]()
- [angular-material 1.1.1]()
- [angular-ui-router 0.3.1]()
- [angular-socket-io 0.7.0]()
- [angular-mocks 1.5.8]()
- [ng-feathers 1.6.1]()

## .env file
Define environment variables used to configure the build of the client-side Angular application.

```
MODULE_NAME=abl
FEATHERS_URL=http://localhost:3030
DEBUG=true
```

The contents of this file can be accessed in HTML / Javascript. For example:

.js
```javascript
var moduleName = '/* @echo MODULE_NAME */';
```

.html
```html
<html ng-app="<!-- @echo MODULE_NAME -->">
```

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
- Starts browserSync on port 3000
- Starts Express/Feathers.js API server on port 3030
- Watches file changes and reloads browserSync and test/server.js (API server)

### Local API Server
- The test/server.js file starts a local instance of the same Express/Feathers.js server platform hosted on the backend in production.
- Sample data is persisted using NeDB which uses flat-file databases locally so no need to configure MongoDB on your dev system.
- API end-points remain unchanged from dev to production, so all we need to change is the FEATHERS_URL in the .env file to direct the client application to use an internet accessible Feathers.js API server (e.g. https://api.adventurebucketlist.com vs. http://localhost:3030).

## Distribution
```
npm run dist
```

## Testing
```
npm run test
```

Unit testing with [Karma](http://karma-runner.github.io/1.0/index.html), [Jasmine](http://jasmine.github.io/), and generated code coverage reports with [Istanbul](https://github.com/gotwarlost/istanbul).

[Reference Guide -- airpair.com](https://www.airpair.com/angularjs/posts/unit-testing-angularjs-applications)

# Benefits
- Build Angular.js apps in a structured (component-based) way
- Simple, high performance
- Production ready (this structure is used in production by a few large organizations)
- Fast development
- Component based structure
- Uses [John Papa](https://github.com/johnpapa/angular-styleguide) conventions

## Features
- Live reload development web server (browserSync)
- Babel (es2015) javascript compilation
- SCSS (node-sass)
- ESLint
- Preprocessing HTML and Javascript (by using ```.env``` file)
- Use node_modules & npm for front-end dependency management

## Logging / Debugging
ALWAYS use Angular's built-in $logProvider and $log.debug() for logging to console for debugging purposes. This way, we can enable/disable logging application-wide for development and production simply by changing the DEBUG boolean variable in the .env file.

```javascript
function MainController ($scope, $log, config) {
  // Only printed to console if debug mode is enabled.
  $log.debug('Debug mode enabled.');
}
```

ESLint will throw warnings if you forget the rules and use console.log like a ninnymuggins.

## 'Safe' $apply in Angular.js
To avoid triggering the '$apply already in progress' error (for me I find I hit most often when integrating third party plugins that trigger a lot of DOM events), you can use a 'safeApply' method that checks the current phase before executing your function. This is patched into the $scope object of topmost controller, NavController, and Angular is nice enough to propagate it throughout the rest of the application:

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

Usage within child controllers throughout the application:
```javascript
$scope.safeApply();
```

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
file name: `dashboard.directive.js`

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
file name: `dashboard.controller.js`

```javascript
function DashboardController () {
  var vm = this;
}
```

### Factories / Services
file name: `users.factory.js`

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
