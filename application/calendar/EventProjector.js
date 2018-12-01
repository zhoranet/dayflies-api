const moment = require('moment');

module.export = class EventProjector {
	constructor(occasionRepository) {}

	projectOccasions = async date => {
		const mDate = moment(date);
		const dailyOccasions = await occasionRepository.getOccasionsOnDay(mDate.dayOfYear());
		const weeklyOccasions = await occasionRepository.getOccasionsOnWeekDay(mDate.day());
		const monthlyOccasions = await occasionRepository.getOccasionsOnMonthDay(mDay.date());

		var result = arr.reduce(function (map, obj) {
			map[obj.key] = obj.val;
			return map;
		}, {});

		var merged = new Map([...map1, ...map2, ...map3]);
	};
};
