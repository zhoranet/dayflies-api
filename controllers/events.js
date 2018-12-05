const EventUpdater = require('../application/calendar/eventUpdater');
const EventRepository = require('../application/infrastructure/eventRepository');

exports.getEvents = (req, res, next) => {
	res.status(200).json({
		occasions: [{title: 'First Event', content: 'This is the first event!'}]
	});
};

exports.createEvent = async (req, res, next) => {
	const {title, description, startDate, endDate, repeat} = req.body;
	const event = {title, description, startDate, endDate, repeat};

	try {
		const updater = new EventUpdater(new EventRepository());
		const result = await updater.createEvent(event);
		res.status(201).json(result);
	} catch (error) {
		setServerError(error);
		next(error);
	}
};
