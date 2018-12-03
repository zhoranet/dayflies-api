const moment = require('moment');

module.exports = function EventFinder(eventRepository, occasionRepository) {
	findDailyEvents = async onDate => {
		const nextDay = moment(onDate)
			.add(1, 'day')
			.toDate();
		return await findEvents(onDate, nextDay);
	};

	arrayContainsDate = (dates, date) => {
		return !!dates.find(d => moment(d).diff(date, 'day') === 0);
	};

	getComplementDates = (fromDate, toDate, availableDates) => {
		const mFromDate = moment(fromDate);
		const mToDate = moment(toDate);
		const numberOfDays = mToDate.diff(mFromDate, 'days');
		const complementDays = [];
		for (let i = 0; i < numberOfDays; i++) {
			let currentDate = mFromDate.add(i, 'day');
			if (!arrayContainsDate(availableDates, currentDate)) {
				complementDays.push(currentDate);
			}
		}

		return complementDays;
	};

	findEvents = async (fromDate, toDate) => {
		const projectedDates = await occasionRepository.getProjectedDates(fromDate, toDate);

		const complementDates = getComplementDates(fromDate, toDate, projectedDates);

		if (complementDates) {
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
		},

		findEvents: async (fromDate, toDate) => await findEvents(fromDate, toDate),

		getComplementDates: (fromDate, toDate, projectedDates) => getComplementDates(fromDate, toDate, projectedDates)
	};
};
