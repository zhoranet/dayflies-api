const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
	monthDay: {
		type: Number,
		required: false
	},
	weekDay: {
		type: Number,
		required: false	
	},
	month: {
		type: Number,
		required: false
	},
	year: {
		type: Number,
		required: false
	}
});

const eventSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		startDate: {
			type: Object,
			required: true
		},
		endDate: {
			type: Object,
			required: true
		},		
		repeat: {
			type: String,
			required: false
		},
		schedule: scheduleSchema

	},
	{timestamps: true}
);

module.exports = mongoose.model('Event', eventSchema);
