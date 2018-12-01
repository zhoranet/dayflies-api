const EventFinder = require('./EventFinder');

occasionRepositoryMock = () => {
	return {
		getProjectedDates: jest.fn(() => new Error())
	};
}

eventRepositoryMock = () => {
	return {
		getEvents: jest.fn(() => new Error())
	};
};

describe('EventFinder', () => {
	it('Can create EventFinder', () => {
		const eventFinder = new EventFinder(eventRepositoryMock(), occasionRepositoryMock());
		expect(eventFinder).toBeDefined();
	});

	it('Can find daily events', async () => {
		const eventFinder = new EventFinder(eventRepositoryMock(), occasionRepositoryMock());
		const events = await eventFinder.findDailyEvents(new Date(2018, 11, 29));
		expect(events).toBeDefined();
	});
});
