// Feathers/Express server file for locally testing API.
const NeDB = require('nedb');
const feathers = require('feathers');
const handler = require('feathers-errors/handler');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');

const service = require('feathers-nedb');
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/uploads');

const mongoose = require('mongoose');
const mongooseService = require('feathers-mongoose');

const sequelize = require('feathers-sequelize');


// Tell mongoose to use native promises
// See http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
// Connect to your MongoDB instance(s)
mongoose.connect('mongodb://localhost:27017/test');

// Create a feathers instance.
var app = feathers()
  // Enable REST services
  .configure(rest())
  // Enable Socket.io services
  .configure(socketio())
  // Register hooks module
  .configure(hooks())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));

// Require mongoose models
const Property = require('./models/property');

// Connect to the db, create and register a Feathers service.
app.use('/properties', mongooseService({
  Model: Property,
  paginate: {
    default: 50,
    max: 1000
  }
}));

// A basic error handler, just like Express
app.use(handler());

// Logging db
const logDb = new NeDB({
  filename: './server/api/log.db',
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
  filename: './server/api/units.db',
  autoload: true
});

app.use('/units', service({
  Model: unitDb,
  paginate: {
    default: 10,
    max: 1000
  }
}));

const multer = require('multer');
const multipartMiddleware = multer();

// Upload Service with multipart support
app.use('/uploads',

    // multer parses the file named 'uri'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('uri'),

    // another middleware, this time to
    // transfer the received file to feathers
    function(req,res,next){
        console.log('file upload', req);
        req.feathers.file = req.file;
        next();
    },
    blobService({Model: blobStorage})
);

const dauria = require('dauria');

// before-create Hook to get the file (if there is any)
// and turn it into a datauri,
// transparently getting feathers-blob to work
// with multipart file uploads
app.service('/uploads').before({
    create: [
        function(hook) {
            if (!hook.data.uri && hook.params.file){
                const file = hook.params.file;
                const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
                hook.data = {uri: uri};
            }
        }
    ]
});
// Generate local db from sample .js data
// const units = require('./api/properties.samples.js');
// units.forEach(function(unit) {
//   app.service('properties').create(unit);
// });

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.addHeader("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//     next();
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
