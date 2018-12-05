const Event = require('../../models/event');

module.exports = function EventRepository() {
	addNewEvent = async event => {
		return await new Event({...event}).save();
	};

	return {
		addNewEvent: async event => addNewEvent(event)
	};
};
