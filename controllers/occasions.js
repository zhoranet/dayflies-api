const {validationResult} = require('express-validator/check');

const Occasion = require('../models/occasion');

setServerError = error => {
	if (!error.statusCode) {
		error.statusCode = 500;
	}
};

validateInput = req => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(
			'Validation failed, entered data is incorrect.'
		);
		error.statusCode = 422;
		throw error;
	}
};

findOccasion = async occasionId => {
	const occasion = await Post.findById(occasionId);
	if (!occasion) {
		const error = new Error('Could not find occasion.');
		error.statusCode = 404;
		throw error;
	}
	return occasion;
};

exports.getOccasions = async (req, res, next) => {
	const currentPage = req.query.page || 1;
	const perPage = req.query.pageSize || 10;
	//const totalItems = await Occasion.find().countDocuments();
	try {
		const occasions = await Occasion.find()
			.skip((currentPage - 1) * perPage)
			.limit(perPage);
		res.status(200).json(occasions);
	} catch (err) {
		setServerError(err);
		next(err);
	}
};

exports.createOccasion = async (req, res, next) => {
	validateInput(req);

	const occasion = new Occasion({
		title: req.body.title,
		description: req.body.description,
		date: req.body.date,
		repeat: req.body.repeat
	});

	try {
		const result = await occasion.save();
		res.status(201).json(result);
	} catch (error) {
		setServerError(error);
		next(error);
	}
};
exports.updateOccasion = async (req, res, next) => {
	validateInput(req);
	const occasionId = req.params.occasionId;
	try {
		const occasion = await findOccasion(occasionId);
		occasion.title = req.body.title;
		occasion.description = req.body.description;
		occasion.date = req.body.date;
		occasion.repeat = req.body.repeat;
		const result = await occasion.save();
		res.status(200).json(result);
	} catch (error) {
		setServerError(error);
		next(error);
	}
};

exports.deleteOccasion = async (req, res, next) => {
	const occasionId = req.params.occasionId;
	try {
		await findOccasion(occasionId);
		await Occasion.findByIdAndRemove(occasionId);
		res.status(200);
	} catch (error) {
		setServerError(error);
		next(error);
	}	
};
