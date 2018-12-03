const EventFinder = require('./EventFinder');

occasionRepositoryMock = () => {
	return {
		getProjectedDates: jest.fn(() => [new Date(2018, 1, 1)])
	};
};

eventRepositoryMock = () => {
	return {
		getEvents: jest.fn(() => {
			return [{date: new Date(2018, 1, 1), title: 'test'}];
		})
	};
};

describe('EventFinder', () => {
	it('Can create EventFinder', () => {
		const eventFinder = new EventFinder(eventRepositoryMock(), occasionRepositoryMock());
		expect(eventFinder).toBeDefined();
	});

	it('Can find daily events', async () => {
		const eventFinder = new EventFinder(eventRepositoryMock(), occasionRepositoryMock());
		const events = await eventFinder.findEvents(new Date(2018, 1, 1), new Date(2018, 1, 2));
		expect(events).toHaveLength(1);
	});

	it('Can get complement dates', async () => {
		const eventFinder = new EventFinder(eventRepositoryMock(), occasionRepositoryMock());
		const events = await eventFinder.getComplementDates(new Date(2018, 1, 1), new Date(2018, 1, 5), [
			new Date(2018, 1, 1),
			new Date(2018, 1, 2)
		]);
		expect(events).toHaveLength(2);
	});
});
