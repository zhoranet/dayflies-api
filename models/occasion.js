const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const occasionSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		date: {
			type: Object,
			required: true
		},
		repeat: {
			type: String,
			required: false
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Occasion', occasionSchema);
