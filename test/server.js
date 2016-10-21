// Feathers/Express server file for locally testing API.
const NeDB = require('nedb');
const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const service = require('feathers-nedb');

// Create a feathers instance.
var app = feathers()
  // Enable REST services
  .configure(rest())
  // Enable Socket.io services
  .configure(socketio())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));


// Logging db
const logDb = new NeDB({
  filename: './test/api/log',
  autoload: true
});

// Connect to the db, create and register a Feathers service for logging db.
app.use('/log', service({
  Model: logDb,
  paginate: {
    default: 10,
    max: 1000
  }
}));

// Units db
const unitDb = new NeDB({
  filename: './test/api/units',
  autoload: true
});

app.use('/units', service({
  Model: unitDb,
  paginate: {
    default: 10,
    max: 1000
  }
}));

// Properties db
const propertiesDb = new NeDB({
  filename: './test/api/properties',
  autoload: true
});

app.use('/properties', service({
  Model: propertiesDb,
  paginate: {
    default: 10,
    max: 1000
  }
}));

// Generate local db from sample .js data
// const units = require('./api/properties.samples.js');
// units.forEach(function(unit) {
//   app.service('properties').create(unit);
// });

// Start the server.
const port = 3030;
app.listen(port, function() {
  console.log(`API listening localhost:${port}`);
});

// Log API server start
app.service('log').create({
  text: "API_START",
  createdAt: Date.now()
}).then(function(log) {
  console.log('log:', JSON.stringify(log));
});

module.exports = app;
