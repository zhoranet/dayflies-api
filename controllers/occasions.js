const {validationResult} = require('express-validator/check');

const Occasion = require('../models/occasion');

exports.getOccasions = (req, res, next) => {
	const currentPage = req.query.page || 1;
	const perPage = req.query.pageSize || 10;
	let totalItems;
	Occasion.find()
		.countDocuments()
		.then(count => {
			totalItems = count;
			return Occasion.find()
				.skip((currentPage - 1) * perPage)
				.limit(perPage);
		})
		.then(occasions => {
			res.status(200).json(occasions);
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.createOccasion = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(
			'Validation failed, entered data is incorrect.'
		);
		error.statusCode = 422;
		throw error;
	}

	const occasion = new Occasion({
		title: req.body.title,
		description: req.body.description,
		date: req.body.date,
		repeat: req.body.repeat
	});

	occasion
		.save()
		.then(result => {
			res.status(201).json(result);
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
exports.updateOccasion = (req, res, next) => {
	const occasionId = req.params.occasionId;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(
			'Validation failed, entered data is incorrect.'
		);
		error.statusCode = 422;
		throw error;
	}
	Post.findById(occasionId)
		.then(occasion => {
			if (!occasion) {
				const error = new Error('Could not find occasion.');
				error.statusCode = 404;
				throw error;
			}
			post.title = req.body.title;
			post.description = req.body.description;
			post.date = req.body.date;
			post.repeat = req.body.repeat;
			return post.save();
		})
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteOccasion = (req, res, next) => {
	const occasionId = req.params.occasionId;
	Post.findById(occasionId)
		.then(occasion => {
			if (!occasion) {
				const error = new Error('Could not find occasion.');
				error.statusCode = 404;
				throw error;
			}
			return Post.findByIdAndRemove(occasionId);
		})
		.then(result => {
			console.log(result);
			res.status(200);
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
