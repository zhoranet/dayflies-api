exports.getEvents = (req, res, next) => {
	res.status(200).json({
		occasions: [
			{title: 'First Event', content: 'This is the first event!'},
		],
	});
};
