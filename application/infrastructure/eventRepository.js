module.exports = function EventRepository() {
	addNewEvent = async event => {
		return await new Event({...event}).save();
	};

	return {
		addNewEvent: addNewEvent()
	};
};
