exports.getOccasions = (req, res, next) => {
	res.status(200).json({
		occasions: [
			{title: 'First Occasion', content: 'This is the first occasion!'},
		],
	});
};

exports.createOrUpdateOccasion = (req, res, next) => {
	const title = req.body.title;
	const content = req.body.content;
	// Create post in db
	res.status(201).json({
		message: 'Occasion created successfully!',
		post: {id: new Date().toISOString(), title: title, content: content},
	});
};
