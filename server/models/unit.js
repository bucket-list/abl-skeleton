const Unit = new Schema({
	organizations: [{
		type: Schema.Types.ObjectId,
		ref: "Organization"
	}],
	property: {
		type: Schema.Types.ObjectId,
		ref: "Property"
	},
	amenities: [{
		type: Schema.Types.ObjectId,
		ref: "Amenity"
	}],
	rooms: ["bedroom", "bathroom", "kitchen", "laundry", "parking"].reduce((memo, type) => Object.assign(memo, {
		[type]: {
			type: Number,
			default: 0,
			min: 0, // TODO i18n
			validate: [{
				validator: Number.isInteger,
				message: langModel["unit-room-is-not-integer"] // TODO i18n
			}]
		}
	}), {}),
	beds: ["king", "queen", "double", "sofa"].reduce((memo, type) => Object.assign(memo, {
		[type]: {
			type: Number,
			default: 0,
			min: 0, // TODO i18n
			validate: [{
				validator: Number.isInteger,
				message: langModel["unit-bed-is-not-integer"] // TODO i18n
			}]
		}
	}), {}),

	size: {
		_id: false,
		amount: {
			type: Number,
			default: 0,
			min: [0, langModel["unit-size-lt-0"]],
			validate: [{
				validator: Number.isInteger,
				message: langModel["unit-guests-is-not-integer"]
			}]
		},
		unit: String
	},

	guests: {
		type: Number,
		default: 0,
		min: 0, // TODO i18n
		validate: [{
			validator: Number.isInteger,
			message: langModel["unit-guests-is-not-integer"] // TODO i18n
		}]
	},

	number: {
		type: Number,
		min: [0, langModel["unit-number-lt-0"]]
	},
	names: {
		type: [String],
		default: [],
		get: arrayGetter
	},

	timeZone: {
		type: String,
		default: timeZone
	},
	units: []
}, {
	timestamps: true,
	versionKey: false
});

// Unit.plugin(occupancy, {prefix: "unit"});
Unit.plugin(status, {controller: UnitController});
Unit.plugin(image);
Unit.plugin(strings, {
	fields: {
		title: {
			type: String,
			default: "",
			required: true,
			minlength: titleMinLength,
			maxlength: titleMaxLength
		},
		description: {
			type: String,
			default: "",
			required: true,
			minlength: descriptionMinLength,
			maxlength: descriptionMaxLength
		}
	}
});