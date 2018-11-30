const express = require('express');
const {body} = require('express-validator/check');

const eventsController = require('../controllers/events');
const occasionsController = require('../controllers/occasions');

const router = express.Router();

router.get('/events', eventsController.getEvents);
router.get('/occasions', occasionsController.getOccasions);
router.post('/occasions', [
	body('title')
		.trim()
		.isLength({ min: 5 }),
	body('date')
		.trim()
		.isLength({ min: 10, max: 10 }),
	body('description')
		.trim()
		.isLength({ min: 5 })
], occasionsController.createOccasion);
router.put('/occasions/:occasionId', occasionsController.updateOccasion);
router.delete('/occasions/:occasionId', occasionsController.deleteOccasion);

module.exports = router;
