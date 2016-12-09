var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Configuration variables
const descriptionMinLength = 10;
const descriptionMaxLength = 2000;
const tagLineMinLength = 5;
const tagLineMaxLength = 100;
const timeZone = "America/Vancouver";

//Model plugins
// const LocationSchema = require('./location');

const PropertySchema = new Schema({
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now},
  strings: {
    en: {
      title: {
        type: String,
        'default': ""
      },
      tagline: {
        type: String,
        'default': ""
      },
      description: {
        type: String,
        'default': ""
      }
    },
    fr: {
      title: {
        type: String,
        'default': ""
      },
      tagline: {
        type: String,
        'default': ""
      },
      description: {
        type: String,
        'default': ""
      }
    },
    es: {
      title: {
        type: String,
        'default': ""
      },
      tagline: {
        type: String,
        'default': ""
      },
      description: {
        type: String,
        'default': ""
      }
    }
  },
  contactImage: {type: String, 'default': ""},
  fullName: {type: String, 'default': ""},
  phone: {type: String, 'default': ""},
  phone2: {type: String, 'default': ""},
  email: {type: String, 'default': ""},
  facebook: {type: String, 'default': ""},
  twitter: {type: String, 'default': ""},
  instagram: {type: String, 'default': ""},
  // location: LocationSchema,
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
  defaultImage: {
    type: String,
    'default': ''
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
  },
  type: {
    type: String,
    'default': 'bnb'
  },
  status: {
    type: String,
    'default': '0'
  },
  location: {
    tag: {
      type: String,
      'default': "Main Location"
    },
    streetAddress: {
      type: String,
      'default': ""
    },
    city: String,
    state: String,
    stateCode: {
      type: String,
      uppercase: true
    },
    country: String,
    countryCode: {
      type: String,
      uppercase: true
    },
    zipCode: String,
    location: {
      _id: false,
      type: {
        type: String,
        enum: ["Point", "LineString", "Polygon"],
        'default': "Point"
      },
      coordinates: {
        type: [Schema.Types.Mixed],
        'default': [0, 0]
      }
    }
  }
});

PropertySchema.index({'updatedAt': -1, background: true});

var PropertyModel = mongoose.model('Property', PropertySchema);

module.exports = PropertyModel;
