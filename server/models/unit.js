var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Configuration variables
const descriptionMinLength = 10;
const descriptionMaxLength = 2000;
const tagLineMinLength = 5;
const tagLineMaxLength = 100;
const timeZone = "America/Vancouver";


const UnitSchema = new Schema({
	property: {
		type: Schema.Types.ObjectId
	},
	amenities: {
		type: [String],
		'default': []
	},
	rooms: ["bedroom", "bathroom", "kitchen", "laundry", "parking"].reduce((memo, type) => Object.assign(memo, {
		[type]: {
			type: Number,
			default: 0
		}
	}), {}),
	beds: ["king", "queen", "double", "sofa"].reduce((memo, type) => Object.assign(memo, {
		[type]: {
			type: Number,
			default: 0
		}
	}), {}),

	size: {
		_id: false,
		amount: {
			type: Number,
			default: 0
		},
		unit: String
	},

	guests: {
		type: Number,
		default: 0
	},

	number: {
		type: Number,
	},
	names: {
		type: [String],
		default: [],
	},

	timeZone: {
		type: String,
		default: timeZone
	},
	units: [],
	status: {
		type: String,
		default: "active"
	},
	images: {
		type: [String],
		default: []
	},
	defaultImage: {
    	type: String,
    	'default': ''
  	},
	originalMinOcc: Number,
	originalMaxOcc: Number,
	minOcc: {
		type: Number,
		default: 1
	},
	maxOcc: {
		type: Number
	},
	property: {
		type: String,
		'default': ''
	},
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
	}



}, {
	timestamps: true,
	versionKey: false
});

// Unit.plugin(occupancy, {prefix: "unit"});
//Unit.plugin(status, {controller: UnitController});
//Unit.plugin(image);
//Unit.plugin(strings, {
//	fields: {
//		title: {
//			type: String,
//			default: "",
//			required: true,
//			minlength: titleMinLength,
//			maxlength: titleMaxLength
//		},
//		description: {
//			type: String,
//			default: "",
//			required: true,
//			minlength: descriptionMinLength,
//			maxlength: descriptionMaxLength
//		}
//	}
//});
UnitSchema.index({'updatedAt': -1, background: true});

var UnitModel = mongoose.model('Unit', UnitSchema);

module.exports = UnitModel;