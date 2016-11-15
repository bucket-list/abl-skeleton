var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Configuration variables
const descriptionMinLength = 10;
const descriptionMaxLength = 2000;
const tagLineMinLength = 5;
const tagLineMaxLength = 100;
const timeZone = "America/Vancouver";

//Model plugins
const LocationSchema = require('./location');

const PropertySchema = new Schema({
  title: {type: String},
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now},
  description: {
    type: String,
    'default': ""
  },
  location: LocationSchema,
  tagline: {
    type: String,
    'default': ""
  },
  timeZone: {
    type: String,
    'default': timeZone
  },
  type: {
    type: String,
    enum: ["villa"]
  },
  diamonds: {
    type: Number,
    'default': 0,
    min: 0, // TODO i18n
    max: 5, // TODO i18n
    validate: [{
      validator: Number.isInteger,
      message: "property-diamonds-is-not-integer"
    }]
  },
  images: {
    type: [String],
    'default': []
  },
  houseRules: {
    type: [String],
    'default': []
  },
  organizations: {
    type: [String],
    'default': []
  },
  amenities: {
    type: [String],
    'default': []
  },
  accessibilities: {
    type: [String],
    'default': []
  },
  activities: {
    type: [String],
    'default': []
  },
  meals: {
    type: [String],
    'default': []
  },
  near: {
    type: [String],
    'default': []
  },
  charges: {
    type: [String],
    'default': []
  }
});

PropertySchema.index({'updatedAt': -1, background: true});

var PropertyModel = mongoose.model('Property', PropertySchema);

module.exports = PropertyModel;
