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

module.exports = mongoose.model('Schedule', scheduleSchema);
