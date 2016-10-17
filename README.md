# ABLskeleton
This is the ABL core application skeleton/scaffold for developing client side Angular.js web applications.

# Libraries
- jquery              3.1.1
- socket.io           1.5.0
- feathers-client     1.6.1
- angular             1.5.8
- angular-animate     1.5.8
- angular-aria        1.5.8
- angular-messages    1.5.8
- angular-material    1.1.1
- angular-ui-router   0.3.1
- angular-socket-io   0.7.0
- angular-mocks       1.5.8
- ng-feathers         1.6.1

# .env file
The content of this file can be accessed in HTML / Javascript. For example:

.env
```
MODULE_NAME=myApp
```

```javascript
var moduleName = '/* @echo MODULE_NAME */';
```

```html
<html ng-app="<!-- @echo MODULE_NAME -->">
```

#Install

```
npm install -g gulp karma jasmine-core karma-chrome-launcher requirejs
npm install
```

# Development

```
npm run dev
```

# Distribution

```
npm run dist
```

Build Angular.js apps in a structured (component-based) way.

# Benefits

- Simple, high performance
- Production ready (this structure is used in production by a few large organizations)
- Fast development
- Component based structure
- Uses [John Papa](https://github.com/johnpapa/angular-styleguide) conventions

# Features

- Live reload development web server (browserSync)
- Babel (es2015) javascript compilation
- SCSS (node-sass)
- ESLint (recommended settings)
- Preprocessing HTML and Javascript (by using ```.env``` file)
- Iconfont pipeline (put .svg's in ```icons``` directory, automatically creates iconfont)
- Use node_modules & npm for frontend dependency management

# Components?
Components are small, reusable parts of the application.

### Developing
All component files *DO NOT* need angular module definitions, it happens for you.

So you don't ever have to write this:

```javascript
angular.module('myApp').directive('myAwesomeDirective', myAwesomeDirective);
angular.module('myApp').controller('MyAwesomeController', MyAwesomeController);
```
Instead, the type is defined in the filename i.e. `dashboard.directive.js`, `dashboard.controller.js`

### Why?
Too much wasted time creating files alone, and always the same code repeating -- NO!

We'll declare the type in the filename instead.

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
