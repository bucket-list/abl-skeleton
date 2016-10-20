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


const genUnit =
{
   strings: {
   en: {
         title: "Deluxe Ocean View",
         description: "This unit can see the ocean and has a beautiful decor."
     } // other languages like french, spanish, etc
   },
   size: { amount: 450, unit: "sq ft" },
   guests: 4, // suitable number of guests
   amenities: [
     { _id: "AMEN_ID1", name: "satellite tv" },
     { _id: "AMEN_ID2", name: "broadband internet" },
     { _id: "AMEN_ID3", name: "parking" }
   ],
   images: [ "unit-image-url-1.jpg", "unit-image-url-2.jpg" ], // all unit images
   rooms: { bedroom: 2, bathroom: 2, kitchen: 1, laundry: 1, parking: 1 },
   beds: { king: 1, queen: 1, double: 1, sofa: 1 },
   units: [
     { _id: "UNIT_ID_1", name: "1" },
     { _id: "UNIT_ID_2", name: "2" },
     { _id: "UNIT_ID_3", name: "3" }
   ],
   property: "PROPERTY_ID"
 };

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

// Generate local db from mock .js data
// var units = require('./api/unit.samples.js');
// units.forEach(function(unit) {
//   app.service('units').create(unit);
// });

// Start the server.
const port = 3030;
app.listen(port, function() {
  console.log(`API listening localhost:${port}`);
});

app.service('log').create({
  text: "START",
  createdAt: Date.now()
}).then(function(log) {
  console.log('log:', JSON.stringify(log));
});



module.exports = app;
