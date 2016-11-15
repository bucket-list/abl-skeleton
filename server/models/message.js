var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const descriptionMinLength = 10;
const descriptionMaxLength = 2000;
const tagLineMinLength = 5;
const tagLineMaxLength = 100;
const timeZone = "America/Vancouver";

var MessageSchema = new Schema({
    text: {type: String, required: true},
    createdAt: {type: Date, 'default': Date.now},
    updatedAt: {type: Date, 'default': Date.now},
  	description: {
			type: String,
			'default': ""
  	},
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
    location: {
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

MessageSchema.index({'updatedAt': -1, background: true});

var MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
