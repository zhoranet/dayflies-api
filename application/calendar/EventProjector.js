const moment = require('moment');
const Event = require('../domain/Event');

module.exports = function EventProjector(occasionRepository) {
	projectOccasions = async date => {
		const mDate = moment(date);
		const yearlyOccasions = await occasionRepository.getOccasionsOnYearDay(mDate.dayOfYear());
		const monthlyOccasions = await occasionRepository.getOccasionsOnMonthDay(mDate.date());
		const weeklyOccasions = await occasionRepository.getOccasionsOnWeekDay(mDate.day());
		const yom = new Map(yearlyOccasions.map(oc => [oc.id, oc]));
		const mom = new Map(monthlyOccasions.map(oc => [oc.id, oc]));
		const wom = new Map(weeklyOccasions.map(oc => [oc.id, oc]));
		const merged = new Map([...yom, ...mom, ...wom]);
		const event = new Event(null, date, merged.values);
		await occasionRepository.addProjectedDate(event);
	};

	return {
		projectOccasions: async date => await projectOccasions(date)
	};
};
