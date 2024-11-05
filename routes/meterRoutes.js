// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');

// Route to render the customer list page
router.get('/', meterController.getAllMeters);
//router.get('/meters/:id', meterController.getMeterById); // Route for getting a meter by ID
router.get('/:id', meterController.getMeterById); // Route for getting a meter by ID

module.exports = router;
