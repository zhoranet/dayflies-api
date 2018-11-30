const express = require('express');

const eventsController = require('../controllers/events');
const occasionsController = require('../controllers/occasions');

const router = express.Router();

router.get('/events', eventsController.getEvents);
router.get('/occasions', occasionsController.getOccasions);
router.put('/occasions', occasionsController.createOrUpdateOccasion);

module.exports = router;