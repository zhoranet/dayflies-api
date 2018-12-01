const moment = require('moment');

module.exports = function EventFinder(eventRepository, occasionRepository) {
	findDailyEvents = async onDate => {
		const nextDay = moment(onDate)
			.add(1, 'day')
			.toDate();
		return await findEvents(onDate, nextDay);
	};

	getComplementDates = (fromDate, toDate, availableDates) => {
		return [];
	}

	findEvents = async (fromDate, toDate) => {
		const projectedDates = await occasionRepository.getProjectedDates(fromDate, toDate);

		const complementDates = getComplementDates(fromDate, toDate, projectedDates);

		if (complementDates && complementDates.length) {
			complementDates.forEach(missedDate => {
				// project occasions to dates
			});
		}
		const existingEvents = await eventRepository.getEvents(fromDate, toDate);

		return existingEvents;
	};

	return {
		findDailyEvents: async onDate => {
			return await findDailyEvents(onDate);
		}
	};
};
