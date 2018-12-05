module.exports = function EventUpdater(eventRepository) {
	createScheduleEvent = repeatType => {
		const schedule = {};

		const currentDate = new Date();

		switch (repeatType) {
			case 'daily':
				schedule.year = currentDate.getFullYear();
				break;
			case 'weekly':
				schedule.weekDay = currentDate.getDay();
				break;
			case 'monthly':
				schedule.monthDay = currentDate.getDate();
				break;
			default:
				break;
		}

		return schedule;
	};

	createEvent = async event => {
		const scheduledEvent = {...event};
		scheduledEvent.schedule = createScheduleEvent(scheduledEvent.repeat);
		return await eventRepository.addNewEvent(scheduledEvent);
	};

	return {
		createEvent: async event => await createEvent(event)
	};
};
