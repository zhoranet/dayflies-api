module.exports = function Event(id, date, occasions) {
	getId = () => id;
	setId = newid => (id = newid);

	getDate = () => date;
	setDate = newdate => (date = newdate);

	getOccasions = () => occasions;
	setOccasions = occasions => (occasions = occasions);

	return {
		getId: getId(),
		setId: setId(),
		getDate: getDate(),
		setDate: setDate(),
		setId: setId(),
		getOccasions: getOccasions(),
		setOccasions: setOccasions()
	};
};
