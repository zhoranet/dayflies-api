const EventProjector = require('./EventProjector');

occasionRepositoryMock = () => {
	return {
		getOccasionsOnYearDay: jest.fn(onDate => []),
		getOccasionsOnMonthDay: jest.fn(onDate => []),
		getOccasionsOnWeekDay: jest.fn(onDate => []),
		addProjectedDate: jest.fn(() => [])
	};
};

describe('EventProjector', () => {
	it('Can create EventProjector', () => {
		const eventProjector = new EventProjector(occasionRepositoryMock());
		expect(eventProjector).toBeDefined();
	});

	it('Can project occasions', async () => {
		const eventProjector = new EventProjector(occasionRepositoryMock());
		await eventProjector.projectOccasions(new Date(2018, 1, 1));
		expect(eventProjector).toBeDefined();
	});
});
